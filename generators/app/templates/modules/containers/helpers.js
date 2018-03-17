const { upperFirst, find, intersection } = require('lodash');
const { components } = require('../../../constants/configMapping');
const {
  generateIndex,
  generateDetails,
  generateCategory,
} = require('./generators');

const getSelectedComponents = compArr => compArr.map(
  comp => find(components, { name: comp }).file);

const generateContainerFolder = (key, screen, destinationPath) => {
  const selectedComponents = getSelectedComponents(screen.components);
  const containerFolder = `${destinationPath}/${upperFirst(key)}`;

  generateIndex(key, selectedComponents, containerFolder);
  generateDetails(key, containerFolder);

  if (selectedComponents.indexOf('Category') !== -1) {
    generateCategory(key, containerFolder);
  }
};

module.exports = (screens, keys, destinationPath) => {
  keys.forEach((key, idx) => {
    generateContainerFolder(key, screens[idx], destinationPath);
  });

  return true;
};
