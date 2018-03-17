const Generator = require('yeoman-generator');
const yosay = require('yosay');
const prompts = require('./utils/prompts');
const checkSysDeps = require('./utils/sysDeps');
const installReactNative = require('./utils/reactNative');
const copyStaticTree = require('./utils/staticTree');
const generateFiles = require('./utils/files');
const updatePackage = require('./utils/package');
const yarn = require('./utils/yarn');
const updateEnvFile = require('./utils/env');
const updateInfoPlist = require('./utils/plist');
const conf = require('./constants/configMapping');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(yosay(conf.yosay));
  }

  checkDeps() {
    checkSysDeps(this);
  }

  promtingForConfig() {
    return prompts(this)
      .then(config => {
        this.props = config;
      });
  }

  installRN() {
    return installReactNative(this);
  }

  copyStatic() {
    copyStaticTree(this);
  }

  generate() {
    generateFiles(this);
  }

  patchPackage() {
    updatePackage(this);
  }

  installDeps() {
    return yarn(this);
  }

  updateEnv() {
    updateEnvFile(this);
  }

  updatePlist() {
    updateInfoPlist(this);
  }
};
