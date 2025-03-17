import React, { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import TabBar from './TabBar';
import Editor from './Editor';
import Preview from './Preview';
import '../styles/App.css';

const App = () => {
  // 状态管理
  const [showSidebar, setShowSidebar] = useState(true);
  const [viewMode, setViewMode] = useState('split'); // split, edit, read, immersive
  const [theme, setTheme] = useState('github-light');
  const [tabs, setTabs] = useState([{ id: 1, title: '未命名.md', content: '', active: true }]);

  // 监听来自主进程的菜单事件
  useEffect(() => {
    // 视图相关事件
    ipcRenderer.on('view-split', () => setViewMode('split'));
    ipcRenderer.on('view-edit', () => setViewMode('edit'));
    ipcRenderer.on('view-read', () => setViewMode('read'));
    ipcRenderer.on('view-immersive', () => setViewMode('immersive'));
    ipcRenderer.on('view-sidebar', (_, checked) => setShowSidebar(checked));

    // 主题相关事件
    ipcRenderer.on('theme-github-light', () => setTheme('github-light'));
    ipcRenderer.on('theme-github-dark', () => setTheme('github-dark'));

    // 清理事件监听
    return () => {
      ipcRenderer.removeAllListeners('view-split');
      ipcRenderer.removeAllListeners('view-edit');
      ipcRenderer.removeAllListeners('view-read');
      ipcRenderer.removeAllListeners('view-immersive');
      ipcRenderer.removeAllListeners('view-sidebar');
      ipcRenderer.removeAllListeners('theme-github-light');
      ipcRenderer.removeAllListeners('theme-github-dark');
    };
  }, []);

  // 添加新标签页
  const addTab = () => {
    const newTab = {
      id: Date.now(),
      title: `未命名${tabs.length + 1}.md`,
      content: '',
      active: true
    };
    
    setTabs(prevTabs => 
      prevTabs.map(tab => ({ ...tab, active: false })).concat(newTab)
    );
  };

  // 切换标签页
  const switchTab = (id) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => ({ ...tab, active: tab.id === id }))
    );
  };

  // 关闭标签页
  const closeTab = (id) => {
    // 如果只有一个标签页，则不关闭
    if (tabs.length === 1) return;
    
    const tabIndex = tabs.findIndex(tab => tab.id === id);
    const isActive = tabs[tabIndex].active;
    
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== id);
      
      // 如果关闭的是当前活动标签页，则激活下一个或上一个标签页
      if (isActive) {
        const newActiveIndex = tabIndex === newTabs.length ? tabIndex - 1 : tabIndex;
        newTabs[newActiveIndex].active = true;
      }
      
      return newTabs;
    });
  };

  // 更新标签页内容
  const updateTabContent = (content) => {
    setTabs(prevTabs => 
      prevTabs.map(tab => 
        tab.active ? { ...tab, content } : tab
      )
    );
  };

  // 获取当前活动标签页
  const activeTab = tabs.find(tab => tab.active) || tabs[0];

  return (
    <div className={`app-container ${theme}`}>
      <div className="main-layout">
        {showSidebar && <Sidebar />}
        <div className="workspace">
          <Toolbar />
          <TabBar 
            tabs={tabs} 
            onTabClick={switchTab} 
            onTabClose={closeTab} 
            onAddTab={addTab} 
          />
          <div className={`content-area ${viewMode}`}>
            {(viewMode === 'split' || viewMode === 'edit' || viewMode === 'immersive') && (
              <Editor 
                content={activeTab.content} 
                onChange={updateTabContent} 
                immersive={viewMode === 'immersive'} 
              />
            )}
            {(viewMode === 'split' || viewMode === 'read') && (
              <Preview content={activeTab.content} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;