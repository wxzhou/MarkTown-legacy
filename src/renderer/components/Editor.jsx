import React from 'react';
import '../styles/Editor.css';

const Editor = ({ content, onChange, immersive }) => {
  return (
    <div className={`editor ${immersive ? 'immersive' : ''}`}>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在此输入Markdown内容..."
      />
    </div>
  );
};

export default Editor;