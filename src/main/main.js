const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const { initialize, enable } = require('@electron/remote/main');

// 初始化remote模块
initialize();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // 启用remote模块
  enable(mainWindow.webContents);

  // 加载应用
  mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));

  // 创建菜单
  createMenu();
}

function createMenu() {
  const template = [
    // macOS系统会将第一个菜单项自动变为应用程序名称
    {
      label: 'MarkTown',
      submenu: [
        { role: 'about', label: '关于MarkTown' },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: '隐藏MarkTown' },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '显示全部' },
        { type: 'separator' },
        { role: 'quit', label: '退出MarkTown' }
      ]
    },
    // 添加文件菜单
    {
      label: '文件',
      submenu: [
        { label: '新建', accelerator: 'CmdOrCtrl+N', click: () => mainWindow.webContents.send('menu-new') },
        { label: '打开', accelerator: 'CmdOrCtrl+O', click: () => mainWindow.webContents.send('menu-open') },
        { label: '保存', accelerator: 'CmdOrCtrl+S', click: () => mainWindow.webContents.send('menu-save') },
        { label: '另存为', accelerator: 'CmdOrCtrl+Shift+S', click: () => mainWindow.webContents.send('menu-save-as') },
        { type: 'separator' },
        { label: '关闭', accelerator: 'CmdOrCtrl+W', click: () => mainWindow.webContents.send('menu-close') },
        { label: '退出', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }
      ]
    },
    // 其他菜单保持不变
    {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '重做', accelerator: 'CmdOrCtrl+Y', role: 'redo' },
        { type: 'separator' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: '全选', accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    },
    {
      label: '段落',
      submenu: [
        { label: '一级标题', accelerator: 'CmdOrCtrl+1', click: () => mainWindow.webContents.send('format-heading-1') },
        { label: '二级标题', accelerator: 'CmdOrCtrl+2', click: () => mainWindow.webContents.send('format-heading-2') },
        { label: '三级标题', accelerator: 'CmdOrCtrl+3', click: () => mainWindow.webContents.send('format-heading-3') },
        { label: '四级标题', accelerator: 'CmdOrCtrl+4', click: () => mainWindow.webContents.send('format-heading-4') },
        { label: '五级标题', accelerator: 'CmdOrCtrl+5', click: () => mainWindow.webContents.send('format-heading-5') },
        { label: '六级标题', accelerator: 'CmdOrCtrl+6', click: () => mainWindow.webContents.send('format-heading-6') },
        { type: 'separator' },
        { label: '升级标题', click: () => mainWindow.webContents.send('format-heading-up') },
        { label: '降级标题', click: () => mainWindow.webContents.send('format-heading-down') },
        { type: 'separator' },
        { label: '无序列表', click: () => mainWindow.webContents.send('format-unordered-list') },
        { label: '有序列表', click: () => mainWindow.webContents.send('format-ordered-list') },
        { label: '任务列表', click: () => mainWindow.webContents.send('format-task-list') },
        { type: 'separator' },
        { label: '分割线', click: () => mainWindow.webContents.send('format-horizontal-rule') },
        { label: '表格', click: () => mainWindow.webContents.send('format-table') },
        { label: '代码块', click: () => mainWindow.webContents.send('format-code-block') },
        { label: '引用', click: () => mainWindow.webContents.send('format-blockquote') },
        { label: '行间公式', click: () => mainWindow.webContents.send('format-math-block') },
        { label: 'HTML块', click: () => mainWindow.webContents.send('format-html-block') },
        { label: '前言', click: () => mainWindow.webContents.send('format-frontmatter') },
        { label: '流程图', click: () => mainWindow.webContents.send('format-flowchart') }
      ]
    },
    {
      label: '格式',
      submenu: [
        { label: '加粗', accelerator: 'CmdOrCtrl+B', click: () => mainWindow.webContents.send('format-bold') },
        { label: '倾斜', accelerator: 'CmdOrCtrl+I', click: () => mainWindow.webContents.send('format-italic') },
        { label: '下划线', accelerator: 'CmdOrCtrl+U', click: () => mainWindow.webContents.send('format-underline') },
        { label: '删除线', click: () => mainWindow.webContents.send('format-strikethrough') },
        { label: '高亮', click: () => mainWindow.webContents.send('format-highlight') },
        { label: '行内代码', click: () => mainWindow.webContents.send('format-inline-code') },
        { label: '行内公式', click: () => mainWindow.webContents.send('format-inline-math') },
        { label: '上标', click: () => mainWindow.webContents.send('format-superscript') },
        { label: '下标', click: () => mainWindow.webContents.send('format-subscript') },
        { label: '超链接', click: () => mainWindow.webContents.send('format-link') },
        { label: '图片', click: () => mainWindow.webContents.send('format-image') },
        { label: '日期', click: () => mainWindow.webContents.send('format-date') },
        { type: 'separator' },
        { label: '清除格式', click: () => mainWindow.webContents.send('format-clear') }
      ]
    },
    {
      // 在视图菜单中修改显示边栏选项
      label: '视图',
      submenu: [
        { 
          label: '分栏', 
          type: 'radio',
          checked: true,
          click: () => mainWindow.webContents.send('view-split') 
        },
        { 
          label: '编辑', 
          type: 'radio',
          click: () => mainWindow.webContents.send('view-edit') 
        },
        { 
          label: '阅读', 
          type: 'radio',
          click: () => mainWindow.webContents.send('view-read') 
        },
        { 
          label: '沉浸', 
          type: 'radio',
          click: () => mainWindow.webContents.send('view-immersive') 
        },
        { type: 'separator' },
        { 
          label: '显示边栏', 
          type: 'checkbox',
          checked: true,
          click: (menuItem) => {
            console.log('菜单项点击，显示边栏:', menuItem.checked);
            mainWindow.webContents.send('view-sidebar', menuItem.checked);
          }
        }
      ]
    },
    {
      label: '主题',
      submenu: [
        { 
          label: 'GitHub Light', 
          type: 'radio',
          checked: true,
          click: () => mainWindow.webContents.send('theme-github-light') 
        },
        { 
          label: 'GitHub Dark', 
          type: 'radio',
          click: () => mainWindow.webContents.send('theme-github-dark') 
        }
      ]
    },
    {
      label: '帮助',
      submenu: [
        { label: 'MarkDown语法', click: () => mainWindow.webContents.send('help-markdown-syntax') },
        { label: '发布说明', click: () => mainWindow.webContents.send('help-release-notes') },
        { label: '网站', click: () => mainWindow.webContents.send('help-website') }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});