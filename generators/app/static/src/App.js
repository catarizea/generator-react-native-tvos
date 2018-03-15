/* eslint no-console: 0 */

import React from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import localeData from './i18n/translation.json';
import Navigator from './navigator';
import createStore from './redux';
import deviceInfo from './constants/deviceInfo';
import { ignored } from './constants/yellowBox';

addLocaleData([...en]);

console.ignoredYellowBox = ignored;
console.disableYellowBox = true;

const App = () => {
  const language = deviceInfo.locale.toLowerCase().split(/[_-]+/)[0];
  const messages = localeData[language] || localeData.en;
  const store = createStore(deviceInfo);

  return (
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages} textComponent={Text}>
        <Navigator />
      </IntlProvider>
    </Provider>
  );
};

export default App;
