const jetpack = require('fs-jetpack');
const conf = require('../constants/configMapping');

const response = {
  screens: [],
};

const theme = {
  type: 'list',
  message: 'Select a theme for your application',
  name: 'theme',
  choices: conf.themes.map(theme => theme.name),
};

const newScreen = {
  type: 'input',
  name: 'screen',
  message: 'What is the title of the new Screen?',
  validate: value => {
    const pass = value.trim();

    if (pass) {
      return true;
    }

    return 'Please enter a title for the new Screen.';
  },
};

const anotherScreen = {
  type: 'confirm',
  name: 'askAgain',
  message: 'Want to add another Screen (just hit enter for YES)?',
  default: true,
};

const components = {
  type: 'checkbox',
  message: 'Select one or more components for the current Screen.',
  name: 'components',
  choices: conf.components.map(component => component.name),
  validate: answer => {
    if (!answer.length) {
      return 'You must choose at least one component for the current screen.';
    }

    return true;
  }
};

const screens = self => {
  return self.prompt(newScreen)
    .then(answer => {
      response.screens.push({ name: answer.screen });

      return self.prompt(components)
        .then(ans => {
          const idx = response.screens.length - 1;

          const updScreen = Object.assign(
            {},
            { name: response.screens[idx].name },
            { components: ans.components }
          );

          response.screens[idx] = updScreen;

          return self.prompt(anotherScreen)
            .then(answ => {
              if (answ.askAgain) {
                return screens(self);
              }

              return response;
            });
        });
    });
};

module.exports = self => {
  const appName = {
    type: 'input',
    name: 'appName',
    message: 'Your application name',
    default: conf.defaultAppName,
    validate: value => {
      const pass = value.trim();
      const rootPath = self.destinationPath(pass);

      if (jetpack.exists(rootPath) !== 'dir') {
        return true;
      }

      return `A folder with the same name already exists.\n
${rootPath}\n
Please enter another application name`;
    },
  };

  return self.prompt(appName)
    .then(appNameAnswer => {
      response.appName = appNameAnswer.appName;
      return self.prompt(theme)
        .then(themeAnswer => {
          response.theme = themeAnswer.theme;
          return screens(self);
        });
    });
};
