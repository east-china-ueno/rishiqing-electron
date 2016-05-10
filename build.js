var packager = require('electron-packager');
var yargs    = require('yargs');
var fs       = require('fs');
var package  = require('./package.json');
var argv     = yargs.argv;

var arch = argv.arch,
  dir    = './dir/',
  platform = argv.platform,
  asar = true,
  icon = platform === 'darwin' ? './res/app.icns' : './res/icon.ico',
  name = 'rishiqing',
  out  = './package/release/',
  overwrite = true,
  version = package.electronVersion,
  app_bundle_id = 'release.rishiqing.electron'
try {
  var outDirState = fs.lstatSync(out);
} catch (e) {
  try {
    var packageDirState = fs.lstatSync('./package');
  } catch (e) {
    fs.mkdirSync('./package');
  }
  fs.mkdirSync(out);
}
packager({
  dir: dir,
  arch: arch,
  platform: platform,
  asar: asar,
  icon: icon,
  name: name,
  out: out,
  overwrite: overwrite,
  version: version,
  'app-bundle-id': app_bundle_id
}, function (err, appPaths) {
  console.log('err', err);
  console.log('appPaths', appPaths);
});
