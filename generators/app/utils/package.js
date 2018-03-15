const ora = require('ora');
const jetpack = require('fs-jetpack');
const { toPairs, fromPairs, sortBy } = require('lodash');

module.exports = self => {
  const spinner = ora('Updating package.json').start();
  const rootPath = self.destinationPath(self.props.appName);

  const newPackage = jetpack.read(`${rootPath}/package.json`, 'json');
  const updateWith = jetpack.read(`${__dirname}/../templates/package/updateWith.json`, 'json');

  Object.keys(updateWith).forEach(key => {
    if (newPackage[key]) {
      const updated = fromPairs(sortBy(toPairs(
        Object.assign({}, newPackage[key], updateWith[key]))));

      newPackage[key] = updated;
    } else {
      newPackage[key] = updateWith[key];
    }
  });

  jetpack.write(`${rootPath}/package.json`, newPackage, { jsonIndent: 2 });

  spinner.succeed();
};
