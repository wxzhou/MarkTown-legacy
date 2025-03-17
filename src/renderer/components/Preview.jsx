import React from 'react';
import '../styles/Preview.css';

const Preview = ({ content }) => {
  return (
    <div className="preview">
      <div className="preview-content">
        {/* 这里将来会渲染Markdown内容，现在只是占位 */}
        <p>预览区域 - 将来会渲染Markdown内容</p>
        <pre>{content}</pre>
      </div>
    </div>
  );
};

export default Preview;