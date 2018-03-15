const execa = require('execa');
const ora = require('ora');

const installDeps = self => {
  return new Promise((resolve, reject) => {
    execa.shell(
      `cd ${self.props.appName} && yarn && yarn run generate-data`
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
  const spinner = ora(
    'Updating dependencies'
  ).start();

  return installDeps(self)
    .then(() => spinner.succeed())
    .catch(() => {
      spinner.fail();
      this.env.error('Cannot update dependencies');
    });
};
