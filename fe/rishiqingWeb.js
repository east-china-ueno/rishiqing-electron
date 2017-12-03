/*
* @Author: qinyang
* @Date:   2017-12-02 10:13:54
* @Last Modified by:   qinyang
* @Last Modified time: 2017-12-03 22:01:39
*/
var package      = require('../package.json');
var os           = require('os');
var nativeNotify = require('./nativeNotify');
var notification = require('./notification');
var $            = require('jquery');
var platform     = process.platform;

var dealLogin = function (canAutoLogin) {
  console.log('canAutoLogin', canAutoLogin);
  if (!canAutoLogin) $('.welcome-page').removeClass('hide');
};

module.exports = function (mainWindow) {
  mainWindow.VERSIONSTAMP = {
    version: package.version,
    time: package.releaseTime || (new Date()).toString()
  };

  // 替换我们基于windows.Notification开发的通知模块，主要针对在win7下，只能使用balloon进行通知的问题
  if (platform === 'win32') {
    var release = os.release();
    var first = parseInt(release.split('.')[0], 10);
    if (first !== 10) { // 判断在windows以下都用自己开发的Notification来进行通知
      mainWindow.Notification = nativeNotify; 
    } else { // 如果是win10
      mainWindow.Notification = notification;
    }
  }
  if (platform === 'darwin') {
    mainWindow.Notification = notification;
  }

	// 如果Client_Can_Auto_Login没有被赋值，说明检测是否登录的接口还没有返回
  if (mainWindow.Client_Can_Auto_Login === undefined) {
    var _Client_Can_Auto_Login = undefined;
    mainWindow.Object.defineProperty(mainWindow, 'Client_Can_Auto_Login', {
      configurable: true,
      get: function () {
        return _Client_Can_Auto_Login;
      },
      set: function (v) {
        _Client_Can_Auto_Login = v;
        dealLogin(v);
      }
    });
  } else {
    dealLogin(mainWindow.Client_Can_Auto_Login);
  }
};