import React from 'react';
import { 
  FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaCode, FaHeading, FaQuoteRight, FaListUl, FaListOl, FaCheckSquare, 
  FaLink, FaImage, FaCalendarAlt, FaMinusSquare, FaTable 
} from 'react-icons/fa';
import '../styles/Toolbar.css';

const Toolbar = () => {
  // 工具栏按钮定义
  const tools = [
    { icon: <FaUndo />, title: '撤销', action: () => console.log('撤销') },
    { icon: <FaRedo />, title: '重做', action: () => console.log('重做') },
    { divider: true },
    { icon: <FaBold />, title: '加粗', action: () => console.log('加粗') },
    { icon: <FaItalic />, title: '倾斜', action: () => console.log('倾斜') },
    { icon: <FaUnderline />, title: '下划线', action: () => console.log('下划线') },
    { icon: <FaStrikethrough />, title: '删除线', action: () => console.log('删除线') },
    { icon: <FaCode />, title: '行内代码', action: () => console.log('行内代码') },
    { divider: true },
    { icon: <FaHeading />, title: '二级标题', action: () => console.log('二级标题') },
    { icon: <FaQuoteRight />, title: '引用', action: () => console.log('引用') },
    { icon: <FaListUl />, title: '无序列表', action: () => console.log('无序列表') },
    { icon: <FaListOl />, title: '有序列表', action: () => console.log('有序列表') },
    { icon: <FaCheckSquare />, title: '任务列表', action: () => console.log('任务列表') },
    { divider: true },
    { icon: <FaLink />, title: '超链接', action: () => console.log('超链接') },
    { icon: <FaImage />, title: '图片', action: () => console.log('图片') },
    { icon: <FaCalendarAlt />, title: '日期', action: () => console.log('日期') },
    { icon: <FaMinusSquare />, title: '分割线', action: () => console.log('分割线') },
    { icon: <FaTable />, title: '表格', action: () => console.log('表格') }
  ];

  return (
    <div className="toolbar">
      {tools.map((tool, index) => (
        tool.divider ? (
          <div key={`divider-${index}`} className="toolbar-divider"></div>
        ) : (
          <button 
            key={`tool-${index}`} 
            className="toolbar-button" 
            title={tool.title}
            onClick={tool.action}
          >
            {tool.icon}
          </button>
        )
      ))}
    </div>
  );
};

export default Toolbar;