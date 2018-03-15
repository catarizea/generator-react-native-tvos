const execa = require('execa');
const ora = require('ora');
const jetpack = require('fs-jetpack');
const reactNativeVersion = require('../constants/reactNativeVersion');

const installRN = self => {
  return new Promise((resolve, reject) => {
    execa.shell(
      `react-native init --version="${reactNativeVersion}" ${self.props.appName}`
    ).then(result => {
      self.log('\n' + result.stdout);
      resolve();
    }).catch(err => {
      self.log('\n' + err.stderr);
      reject();
    });
  });
};

module.exports = self => {
  const rnSpinner = ora(
    `Creating React Native app ${self.props.appName}`
  ).start();

  jetpack.remove(self.destinationPath(self.props.appName));

  return installRN(self)
    .then(() => rnSpinner.succeed())
    .catch(() => {
      rnSpinner.fail();
      this.env.error('Cannot create React Native app');
    });
};
