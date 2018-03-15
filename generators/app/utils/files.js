const ora = require('ora');
const { makeUniqueKeys } = require('./helpers');
const genRoot = require('../templates/root/helpers');
const genTheme = require('../templates/theme/helpers');
const genActionCreators = require('../templates/redux/actionCreators/helpers');
const genActionTypes = require('../templates/redux/actionTypes/helpers');
const genReducers = require('../templates/redux/reducers/helpers');
const genNavigator = require('../templates/navigator/helpers');
const genContainers = require('../templates/modules/containers/helpers');
const genScreens = require('../templates/modules/screens/helpers');

const generateTask = ({ task, message }) => {
  const spinner = ora(message).start();
  task();
  spinner.succeed();
};

module.exports = self => {
  const rootPath = self.destinationPath(self.props.appName);
  const keys = makeUniqueKeys(self.props.screens.map(screen => screen.name));

  generateTask({
    task: () => genRoot(self.props.appName, rootPath),
    message: 'Generating root index.js',
  });

  generateTask({
    task: () => genTheme(self.props.theme, `${rootPath}/src/theme`),
    message: 'Generating theme index.js',
  });

  generateTask({
    task: () => genActionCreators(keys, `${rootPath}/src/redux/actionCreators`),
    message: 'Generating redux actionCreators',
  });

  generateTask({
    task: () => genActionTypes(keys, `${rootPath}/src/redux/actionTypes`),
    message: 'Generating redux actionTypes',
  });

  generateTask({
    task: () => genReducers(keys, `${rootPath}/src/redux/reducers`),
    message: 'Generating redux reducers',
  });

  generateTask({
    task: () => {
      const { printNavigator, printRoutes } = genNavigator;

      printNavigator(self.props.screens, keys, `${rootPath}/src/navigator`);
      printRoutes(self.props.screens, keys, `${rootPath}/src/navigator`);
    },
    message: 'Generating navigator',
  });

  generateTask({
    task: () => genContainers(
      self.props.screens, keys, `${rootPath}/src/modules/generated/containers`),
    message: 'Generating containers',
  });

  generateTask({
    task: () => genScreens(
      self.props.screens, keys, `${rootPath}/src/modules/generated/screens`),
    message: 'Generating screens',
  });
};
