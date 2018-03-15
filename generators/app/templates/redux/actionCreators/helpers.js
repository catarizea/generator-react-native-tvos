const ejs = require('ejs');
const jetpack = require('fs-jetpack');

const actionTypeTemplate = '<%- key %>ActionTypes,';
const actionTemplate = '<%- key %>: createActionCreators(<%- key %>ActionTypes),';

const print = (template, key) => ejs.render(template, { key });

module.exports = (keys, destinationPath) => {
  const template = jetpack.read(`${__dirname}/index.ejs`);

  const screens = {
    keys: keys.map(key => `'${key}'`).join(', '),
  };

  screens.actionTypes = keys.reduce(
    (acc, key) => acc += `  ${print(actionTypeTemplate, key)}\n`, '');

  screens.actions = keys.reduce(
    (acc, key) => acc += `  ${print(actionTemplate, key)}\n`, '');

  const rendered = ejs.render(template, { screens });
  jetpack.write(`${destinationPath}/index.js`, rendered);

  return true;
};
