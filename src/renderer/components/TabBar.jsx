import React from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import '../styles/TabBar.css';

const TabBar = ({ tabs, onTabClick, onTabClose, onAddTab }) => {
  return (
    <div className="tab-bar">
      <div className="tabs">
        {tabs.map(tab => (
          <div 
            key={tab.id} 
            className={`tab ${tab.active ? 'active' : ''}`}
            onClick={() => onTabClick(tab.id)}
          >
            <span className="tab-title">{tab.title}</span>
            <button 
              className="tab-close" 
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
      <button className="add-tab" onClick={onAddTab}>
        <FaPlus />
      </button>
    </div>
  );
};

export default TabBar;