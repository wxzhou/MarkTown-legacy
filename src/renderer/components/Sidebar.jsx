import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        文件浏览器
      </div>
      <div className="sidebar-content">
        <p>边栏内容区域</p>
        <p>这里将来会显示文件列表或其他内容</p>
      </div>
    </div>
  );
};

export default Sidebar;