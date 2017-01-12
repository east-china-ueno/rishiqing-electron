const request = require('request');
const config = require('../fe/config');
const BrowserWindow = require('electron').BrowserWindow;
const nativeImage   = require('electron').nativeImage;
class Update {
  constructor (mainWindow) {
    this.mainWindow = mainWindow;
    this.webContents = mainWindow.webContents;
    this.initUpdate();
  }
  initUpdate () {
    request.post({ 
      url: config.VERSIONURL, 
      headers: { 'User-Agent': this.webContents.getUserAgent() }
    }, (err, res, body) => {
      try {
        const versionInfo = JSON.parse(body).versionInfo;
        const version_code = versionInfo.version_code;
        if (version_code > config.VERSION) { // 说明有更新
          const win = new BrowserWindow({
            width: 300,
            height: 120,
            alwaysOnTop: true,
            resizable: false,
            webPreferences: {
              nodeIntegration: true
            },
            icon: nativeImage.createFromPath(__dirname + '/../res/icon_256x256.png')
          });
          win.loadURL('file://' + __dirname + '/../fe/autoUpdate.html');
        }
      } catch (e) {  }
    });
  }
}
module.exports = Update;
