const { upperFirst, find } = require('lodash');
const { components } = require('../../../constants/configMapping');
const {
  generateIndex,
  generateTranslation,
} = require('./generators');

const getSelectedComponents = compArr => compArr.map(
  comp => find(components, { name: comp }).file);

const generateScreenFolder = (key, screen, destinationPath) => {
  const selectedComponents = getSelectedComponents(screen.components);
  const containerFolder = `${destinationPath}/${upperFirst(key)}`;

  generateIndex(key, selectedComponents, containerFolder);
};

module.exports = (screens, keys, destinationPath) => {
  keys.forEach((key, idx) => {
    generateScreenFolder(key, screens[idx], destinationPath);
  });

  generateTranslation(screens, keys, destinationPath);

  return true;
};
