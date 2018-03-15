const ora = require('ora');
const platform = require('platform');
const which = require('which');
const execa = require('execa');
const semver = require('semver');

const plsInstall = 'Please install it before running this generator';
const nodeGt = '6.0.0';
const nodeLt = '9.0.0';

const checkOS = self => {
  const osSpinner = ora('Checking operating system').start();

  if (platform.os.toString().indexOf('Darwin') === -1) {
    osSpinner.fail();
    self.env.error('Unsupported operating system');
  } else {
    osSpinner.succeed();
  }
};

const checkNode = self => {
  const nodeSpinner = ora('Checking node version').start();
  const node = which.sync('node', { nothrow: true });
  if (!node) {
    nodeSpinner.fail();
    self.env.error(`Cannot find node. ${plsInstall}`);
  }

  try {
    const nodeVersion = semver.clean(execa.shellSync(`${node} -v`).stdout);
    const isRightVersion = semver.gt(nodeVersion, nodeGt) && semver.lt(nodeVersion, nodeLt);

    if (!isRightVersion) {
      nodeSpinner.fail();
      self.env.error(`Unsupported node version.
      A version greater than ${nodeGt} and lower than ${nodeLt} is required`);
    } else {
      nodeSpinner.succeed();
    }
  } catch (e) {
    nodeSpinner.fail();
    self.env.error('Cannot get node version number');
  }
};

const checkYarn = self => {
  const yarnSpinner = ora('Checking yarn').start();
  const yarn = which.sync('yarn', { nothrow: true });

  if (!yarn) {
    yarnSpinner.fail();
    self.env.error(`Cannot find yarn. ${plsInstall}`);
  } else {
    yarnSpinner.succeed();
  }
};

const checkReactNativeCli = self => {
  const rnCliSpinner = ora('Checking react-native-cli').start();
  const rnCli = which.sync('react-native', { nothrow: true });

  if (!rnCli) {
    rnCliSpinner.fail();
    self.env.error(`Cannot find react-native-cli. ${plsInstall}`);
  } else {
    rnCliSpinner.succeed();
  }
};

module.exports = self => {
  checkOS(self);

  checkNode(self);

  checkYarn(self);

  checkReactNativeCli(self);
};
