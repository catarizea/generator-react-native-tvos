const ejs = require('ejs');
const jetpack = require('fs-jetpack');

const actionTypeTemplate =
  'export const <%- key %>ActionTypes = createActionTypes(\'<%- key %>\');';

const print = (template, key) => ejs.render(template, { key });

module.exports = (keys, destinationPath) => {
  const template = jetpack.read(`${__dirname}/index.ejs`);

  const actionTypes = keys.reduce(
    (acc, key) => acc += `${print(actionTypeTemplate, key)}\n`, '');

  const rendered = ejs.render(template, { actionTypes });
  jetpack.write(`${destinationPath}/index.js`, rendered);

  return true;
};
