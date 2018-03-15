const ejs = require('ejs');
const jetpack = require('fs-jetpack');
const { upperFirst, find, intersection } = require('lodash');
const {
  routesImportTemplate,
  tabBarItemTemplate,
  routesImportContainersTemplate,
  routesTemplate,
} = require('./fragments');
const { components } = require('../../constants/configMapping');

const getSelectedComponents = compArr => compArr.map(
  comp => find(components, { name: comp }).file);

module.exports = {
  printNavigator: (screens, keys, destinationPath) => {
    const template = jetpack.read(`${__dirname}/index.ejs`);

    const nav = {};

    nav.routes = keys.reduce(
      (acc, key) => acc += `  ${ejs.render(routesImportTemplate, { key })}\n`, '');

    nav.initialTab = keys[0];

    nav.tabs = keys.reduce(
      (acc, key, idx) => acc += ejs.render(
        tabBarItemTemplate, { key, title: screens[idx].name }), '');

    const rendered = ejs.render(template, { nav });
    jetpack.write(`${destinationPath}/index.js`, rendered);

    return true;
  },

  printRoutes: (screens, keys, destinationPath) => {
    const template = jetpack.read(`${__dirname}/routes.ejs`);

    const routes = { imports: '', routes: ''};

    keys.forEach((key, idx) => {
      const selectedComponents = getSelectedComponents(screens[idx].components);

      routes.imports += ejs.render(
        routesImportContainersTemplate.index, { upperKey: upperFirst(key) });
      routes.routes += ejs.render(
        routesTemplate.index, { key, upperKey: upperFirst(key), title: screens[idx].name });

      if (intersection(selectedComponents, ['Featured', 'Poster']).length) {
        routes.imports += ejs.render(
          routesImportContainersTemplate.details, { upperKey: upperFirst(key) });
        routes.routes += ejs.render(
          routesTemplate.details, { key, upperKey: upperFirst(key), title: screens[idx].name });
      }

      if (selectedComponents.indexOf('Category') !== -1) {
        routes.imports += ejs.render(
          routesImportContainersTemplate.category, { upperKey: upperFirst(key) });
        routes.routes += ejs.render(
          routesTemplate.category, { key, upperKey: upperFirst(key), title: screens[idx].name });
      }
    });

    const rendered = ejs.render(template, { routes });
    jetpack.write(`${destinationPath}/routes.js`, rendered);

    return true;
  }
};
