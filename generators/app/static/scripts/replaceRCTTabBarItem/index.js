/* eslint-disable */
const fs = require('fs');
const source = `${__dirname}/RCTTabBarItem.m`;
const destination = `${__dirname}/../../node_modules/react-native/React/Views/RCTTabBarItem.m`;

fs.readFile(source, 'utf8', (err, content) => {
  if (err) {
    console.log(err);
    return false;
  }

  fs.writeFile(destination, content, 'utf8', err => {
    if (err) {
      console.log(err);
      return false;
    }

    console.log('RCTTabBarItem.m replaced');
  });
});
