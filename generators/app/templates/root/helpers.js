const ejs = require('ejs');
const jetpack = require('fs-jetpack');

module.exports = (appName, destinationPath) => {
  const template = jetpack.read(`${__dirname}/index.ejs`);

  jetpack.remove(`${destinationPath}/index.js`);
  jetpack.remove(`${destinationPath}/App.js`);

  const rendered = ejs.render(template, { appName });
  jetpack.write(`${destinationPath}/index.js`, rendered);

  return true;
};
