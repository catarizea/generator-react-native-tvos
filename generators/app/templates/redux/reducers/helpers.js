const ejs = require('ejs');
const jetpack = require('fs-jetpack');

const actionTypeTemplate = '<%- key %>ActionTypes,';
const reducersTemplate =
  'const <%- key %> = createReducer(initialState, createHandlers(<%- key %>ActionTypes));';
const objectsTemplate = '<%- key %>,';

const print = (template, key) => ejs.render(template, { key });

module.exports = (keys, destinationPath) => {
  const template = jetpack.read(`${__dirname}/index.ejs`);

  const screens = {};

  screens.actionTypes = keys.reduce(
    (acc, key) => acc += `  ${print(actionTypeTemplate, key)}\n`, '');

  screens.reducers = keys.reduce(
    (acc, key) => acc += `${print(reducersTemplate, key)}\n`, '');

  screens.objects = keys.reduce(
    (acc, key) => acc += `  ${print(objectsTemplate, key)}\n`, '');

  const rendered = ejs.render(template, { screens });
  jetpack.write(`${destinationPath}/index.js`, rendered);

  return true;
};
