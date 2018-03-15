const { camelCase, startCase, upperFirst } = require('lodash');
const randomstring = require('random-string');
const pluralize = require('pluralize');

const generateUnique = (arr, string) => {
  let candidate;

  while (!candidate || (candidate && arr.indexOf(candidate) !== -1)) {
    candidate = `${string}${upperFirst(randomstring({ length: 5 }).toLowerCase())}`;
  }

  return candidate;
};

module.exports = {
  printObject: obj => {
    const printed = Object.keys(obj).reduce(
      (acc, key) => acc += `  ${key}: ${obj[key]},\n`, '');

    return `{\n${printed}}`;
  },

  printImports: importsArr => importsArr.reduce(
    (acc, item) => acc += `import ${item.name} from '${item.from}';\n`, ''),

  formatProps: props => {
    const formated = {};
    Object.keys(props).forEach(key => {
      if (key === 'appName') {
        formated[key] = props[key].indexOf(' ') !== -1
          ? upperFirst(camelCase(startCase(props[key])))
          : props[key];
      } else if (key === 'moduleName') {
        formated[key] = camelCase(props[key]);
      } else {
        formated[key] = props[key];
      }
    });
    return formated;
  },

  makeUniqueKeys: namesArr => {
    const resp = [];

    namesArr.forEach(name => {
      const words = name.split(' ');
      const firstWord = words[0].toLowerCase();

      const candidate = pluralize.isPlural(firstWord)
        ? pluralize.singular(firstWord)
        : firstWord;

      if (resp.indexOf(candidate) === -1) {
        resp.push(candidate);
      } else {
        resp.push(generateUnique(resp, candidate));
      }
    });

    return resp;
  }
};
