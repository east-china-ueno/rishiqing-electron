const electron = require('electron');
const package  = require("./package.json");
const Menu     = require('./native/menu.js');
const Tray     = require('./native/tray.js');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow, webContents;
function createWindow () {
  mainWindow = new BrowserWindow({
    width: package.MIN_WINDOW_WIDTH,
    height: package.MIN_WINDOW_HEIGHT,
    "title":"日事清",
    'webPreferences': {
      'plugins': true,
      'webSecurity':false,
      "nodeIntegration":true
    },
    icon: './res/256x256.ico'
  });
  webContents = mainWindow.webContents;
  const userAgent = webContents.getUserAgent() + ' rishiqing-pc/' + package.version;
  webContents.setUserAgent(userAgent);
  mainWindow.loadURL('file://' + __dirname + '/fe/index.html');
  // 打开调试窗口
  if (package.env === 'dev') {
    webContents.openDevTools();
  }
}
app.on('ready', function () {
  createWindow();
  const m = new Menu();
  const t = new Tray(mainWindow);
});
app.on('window-all-closed', function () {
  app.quit();
});
