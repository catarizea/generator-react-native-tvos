const ejs = require('ejs');
const jetpack = require('fs-jetpack');
const { upperFirst, intersection, get, uniq } = require('lodash');
const dependencies = require('./dependencies');
const { printObject } = require('../../../utils/helpers');

const translationFrag = `
  <%- key %>Title: {
    id: 'Screens.<%- key %>Title',
    defaultMessage: '<%- title %>',
  },`;

const routeImportsFrag = `
import {<%- routes %>
} from '../../../../navigator/routes';
`;

const generateRouteImports = (key, components) => {
  const selectedRoutes = [];
  if (intersection(components, ['Featured', 'Poster']).length) {
    selectedRoutes.push(`${key}DetailsRoute`);
  }

  if (components.indexOf('Category') !== -1) {
    selectedRoutes.push(`${key}CategoryRoute`);
  }

  const routes = selectedRoutes.reduce((acc, route) => {
    return acc += `
  ${route},`;
  }, '');

  return ejs.render(routeImportsFrag, { routes });
};

const generateProps = components => {
  let selectedProps = [];
  components.forEach(comp => {
    const props = get(dependencies, `[${comp}].propTypes`, null);
    if (props) {
      selectedProps = selectedProps.concat(Object.keys(props));
    }
  });

  return uniq(selectedProps).reduce((acc, prop) => {
    return acc += `
    ${prop},`;
  }, '');
};

const generatePropTypes = components => {
  let selectedProps = {};
  components.forEach(comp => {
    const props = get(dependencies, `[${comp}].propTypes`, null);
    if (props) {
      selectedProps = Object.assign({}, selectedProps, props);
    }
  });

  selectedProps.intl = 'PropTypes.object.isRequired';

  return printObject(selectedProps);
};

const generateLists = (key, components) => {
  let lists = '';
  components.forEach(comp => {
    const component = get(dependencies, `[${comp}].component`, null);
    if (component) {
      lists += ejs.render(component, { key });
    }
  });

  return lists;
};

module.exports = {
  generateIndex: (key, selectedComponents, containerFolder) => {
    const template = jetpack.read(`${__dirname}/index.ejs`);
    const sc = {
      routeImports: '',
      key,
      upperKey: upperFirst(key),
      props: '',
      propTypes: '',
      lists: '',
    };

    sc.routeImports = generateRouteImports(key, selectedComponents);
    sc.props = generateProps(selectedComponents);
    sc.propTypes = generatePropTypes(selectedComponents);
    sc.lists = generateLists(key, selectedComponents);

    const rendered = ejs.render(template, { sc });
    jetpack.write(`${containerFolder}/index.js`, rendered);
  },

  generateTranslation: (screens, keys, destinationPath) => {
    const template = jetpack.read(`${__dirname}/messages.ejs`);

    const titles = keys.reduce((acc, key, idx) => {
      return acc += ejs.render(translationFrag, { key, title: screens[idx].name });
    }, '');

    const rendered = ejs.render(template, { titles });
    jetpack.write(`${destinationPath}/messages.js`, rendered);
  },
};
