const jetpack = require('fs-jetpack');
const ora = require('ora');

module.exports = self => {
  const source = `${__dirname}/../static`;
  const destination = self.destinationPath(self.props.appName);

  const copySpinner = ora(
    `Copying static files into folder ${self.props.appName}`
  ).start();

  jetpack.copy(source, destination, { overwrite: true });

  copySpinner.succeed();
};
