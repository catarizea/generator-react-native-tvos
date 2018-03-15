const ejs = require('ejs');
const jetpack = require('fs-jetpack');
const { upperFirst, uniq, get } = require('lodash');
const deps = require('./dependencies');
const handlersDefinitions = require('./handlers');
const { printObject } = require('../../../utils/helpers');

const getDeps = (components, depType, emptyObject) => {
  const dependencies = Object.assign({}, emptyObject);
  const keys = Object.keys(emptyObject);

  components.forEach(comp => {
    const d = get(deps, `[${comp}][${depType}]`, null);
    if (d) {
      keys.forEach(key => {
        if (d && d[key]) {
          dependencies[key] = dependencies[key].concat(d[key]);
        }
      });
    }
  });

  return dependencies;
};

const getHandlers = components => {
  const handlers = { imports: '', bindings: '', functions: '', props: '' };
  let availableHandlers = [];

  components.forEach(comp => {
    const h = get(deps, `[${comp}].handlers`, null);
    if (h && h.length) {
      availableHandlers = availableHandlers.concat(h);
    }
  });

  if (availableHandlers.length) {
    availableHandlers.forEach(handl => {
      const hd = handlersDefinitions[handl];
      if (hd) {
        handlers.imports += hd.dep;
        handlers.bindings += hd.binding;
        handlers.functions += `${hd.func}\n`;
        handlers.props += hd.prop;
      }
    });
  }

  return handlers;
};

const getWillMount = components => {
  const willMount = { props: '', actions: '' };
  const dependencies = getDeps(components, 'willMount', { props: [], actions: [] });

  Object.keys(willMount).forEach(key => {
    if (dependencies[key].length) {
      dependencies[key] = uniq(dependencies[key]);
      willMount[key] = dependencies[key].reduce((acc, prop) => {
        if (key === 'props') {
          return acc += `
      ${prop},`;
        } else {
          return acc += `
    ${prop}`;
        }
      }, '');
    }
  });

  return willMount;
};

const getProps = (components, type) => {
  let propsString = '';
  let props;

  components.forEach(comp => {
    const p = get(deps, `[${comp}][${type}]`, null);
    if (p) {
      const own = Object.keys(p);
      if (own.length) {
        props = Object.assign({}, props, p);
      }
    }
  });

  if (Object.keys(props).length) {
    propsString = printObject(props);
  }

  return propsString;
};

const getMappedProps = components => {
  const mappedProps = { decomposed: '', returned: '' };
  const dependencies = getDeps(components, 'mappedProps', { decomposed: [], returned: [] });

  Object.keys(mappedProps).forEach(key => {
    if (dependencies[key].length) {
      dependencies[key] = uniq(dependencies[key]);
      if (key === 'decomposed') {
        mappedProps[key] = dependencies[key].join(', ');
      } else {
        mappedProps[key] = dependencies[key].reduce((acc, prop) => {
          return acc += `
  ${prop},`;
        }, '');
      }
    }
  });

  return mappedProps;
};

module.exports = {
  generateIndex: (key, components, containerFolder) => {
    const template = jetpack.read(`${__dirname}/index.ejs`);
    const cont = { upperKey: upperFirst(key), key };

    cont.handlers = getHandlers(components);
    cont.willMount = getWillMount(components);
    cont.propTypes = getProps(components, 'propTypes');
    cont.defaultProps = getProps(components, 'defaultProps');
    cont.mappedProps = getMappedProps(components);

    const rendered = ejs.render(template, { cont });
    jetpack.write(`${containerFolder}/index.js`, rendered);
  },

  generateDetails: (key, containerFolder) => {
    const template = jetpack.read(`${__dirname}/Details.ejs`);

    const rendered = ejs.render(template, { key });
    jetpack.write(`${containerFolder}/Details.js`, rendered);
  },

  generateCategory: (key, containerFolder) => {
    const template = jetpack.read(`${__dirname}/Category.ejs`);

    const rendered = ejs.render(template, { key });
    jetpack.write(`${containerFolder}/Category.js`, rendered);
  },
};
