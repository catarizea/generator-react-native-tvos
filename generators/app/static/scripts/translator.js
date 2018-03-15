/* eslint-disable */

const glob = require('glob');
const fs = require('fs');
const mkdirp = require('mkdirp');

const filePattern = `${__dirname}/../src/i18n/translation/**/*.json`;
const outputLanguageDataDir = `${__dirname}/../src/i18n/`;

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = glob.sync(filePattern)
  .map(filename => fs.readFileSync(filename, 'utf8'))
  .map(file => JSON.parse(file))
  .reduce((collection, descriptors) => {
    descriptors.forEach(({ id, defaultMessage }) => {
      if (collection.hasOwnProperty(id)) {
        throw new Error(`Duplicate message id: ${id}`);
      }
      collection[id] = defaultMessage;
    });

    return collection;
  }, {});

console.log(defaultMessages);

mkdirp.sync(outputLanguageDataDir);

fs.writeFileSync(
  `${outputLanguageDataDir}translation.json`,
  `{ "en": ${JSON.stringify(defaultMessages, null, 2)} }`
);
