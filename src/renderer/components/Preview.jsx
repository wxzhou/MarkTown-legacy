import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 导入代码高亮样式
import '../styles/Preview.css';

const Preview = ({ content }) => {
  const [renderedContent, setRenderedContent] = useState('');

  useEffect(() => {
    // 配置 marked 选项
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // 代码块样式前缀
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });

    // 渲染 Markdown 内容
    setRenderedContent(marked(content || ''));
  }, [content]);

  return (
    <div className="preview">
      <div 
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    </div>
  );
};

export default Preview;