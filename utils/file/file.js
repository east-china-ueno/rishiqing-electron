/*
* @Author: apple
* @Date:   2016-01-15 12:11:54
* @Last Modified by:   qinyang
* @Last Modified time: 2017-12-18 11:43:56
*/

const fs       = require('fs');
const path     = require('path');
const md5File  = require('md5-file');
const isGzip   = require('is-gzip');
const fileType = require('./fileType');

class File {
  constructor (config) {
    this.path    = config.path;
    this._init();
  }
  // public
  // 获取扩展名
  // 带点的
  getExtname () {
    return this.extname;
  }
  getExtnameWithoutDot () {
    return this.getExtname().replace(/^\./, '');
  }
  // 获取名字
  getName () {
    return this.name;
  }
  // 获取文件的MD5值
  getMd5 () {
    return md5File.sync(this.path);
  }
  isGzip () {
    return isGzip(fs.readFileSync(this.path));
  }
  fileType () {
    return fileType[this.extname] || 'other';
  }
  rename (newPath) {
    fs.renameSync(this.path, newPath);
    this.path = newPath;
    this._init();
  }
  read () {
    return fs.readFileSync(this.path, 'utf8');
  }
  write (str) {
    fs.writeFileSync(this.path, str, 'utf8');
  }
  // privite
  _init () {
    this.extname = path.extname(this.path);
    this.name    = path.basename(this.path);
  }
  // static
}

module.exports = File;
