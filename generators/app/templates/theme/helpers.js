const ejs = require('ejs');
const jetpack = require('fs-jetpack');
const { find } = require('lodash');
const configMapping = require('../../constants/configMapping');

module.exports = (name, destinationPath) => {
  const template = jetpack.read(`${__dirname}/index.ejs`);
  const theme = find(configMapping.themes, { name });

  const rendered = ejs.render(template, { theme: theme.file });
  jetpack.write(`${destinationPath}/index.js`, rendered);

  return true;
};
