/* eslint-disable */
const fs = require('fs');
const babelrc = `${__dirname}/../.babelrc`;

fs.readFile(babelrc, 'utf8', (err, content) => {
  if (err) {
    console.log(err);
    return false;
  }

  const updatedContent = content.replace(
    /"messagesDir": ".*"/g,
    `"messagesDir": "${__dirname}/../src/i18n/translation/"`
  );

  fs.writeFile(babelrc, updatedContent, 'utf8', err => {
    if (err) {
      console.log(err);
      return false;
    }

    console.log('beblrc updated for react intl translations');
  });
});
