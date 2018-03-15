const jetpack = require('fs-jetpack');
const ora = require('ora');
const ip = require('ip');

module.exports = self => {
  const spinner = ora(
    'Updating .env file'
  ).start();

  const rootPath = self.destinationPath(self.props.appName);
  const content = `ENV_API_BASE_URL=http://${ip.address()}:3000\n`;

  jetpack.write(`${rootPath}/.env`, content);

  spinner.succeed();
};
