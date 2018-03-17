const ora = require('ora');
const plist = require('plist');
const jetpack = require('fs-jetpack');

const UIAppFonts = [
  'Roboto-Black.ttf',
  'Roboto-BlackItalic.ttf',
  'Roboto-Bold.ttf',
  'Roboto-BoldItalic.ttf',
  'Roboto-Italic.ttf',
  'Roboto-Light.ttf',
  'Roboto-LightItalic.ttf',
  'Roboto-Medium.ttf',
  'Roboto-MediumItalic.ttf',
  'Roboto-Regular.ttf',
  'Roboto-Thin.ttf',
  'Roboto-ThinItalic.ttf',
  'Ubuntu-Bold.ttf',
  'Ubuntu-BoldItalic.ttf',
  'Ubuntu-Italic.ttf',
  'Ubuntu-Light.ttf',
  'Ubuntu-LightItalic.ttf',
  'Ubuntu-Medium.ttf',
  'Ubuntu-MediumItalic.ttf',
  'Ubuntu-Regular.ttf',
  'Lato-Black.ttf',
  'Lato-BlackItalic.ttf',
  'Lato-Bold.ttf',
  'Lato-BoldItalic.ttf',
  'Lato-ExtraBold.ttf',
  'Lato-ExtraBoldItalic.ttf',
  'Lato-ExtraLight.ttf',
  'Lato-ExtraLightItalic.ttf',
  'Lato-Italic.ttf',
  'Lato-Light.ttf',
  'Lato-LightItalic.ttf',
  'Lato-Medium.ttf',
  'Lato-MediumItalic.ttf',
  'Lato-Regular.ttf',
  'Lato-SemiBold.ttf',
  'Lato-SemiBoldItalic.ttf',
  'Lato-Thin.ttf',
  'Lato-ThinItalic.ttf',
  'FontAwesome.ttf',
];

module.exports = self => {
  const spinner = ora('Updating tvOS target Info.plist').start();

  const rootPath = self.destinationPath(self.props.appName);
  const plistPath = `${rootPath}/ios/${self.props.appName}-tvOS/Info.plist`;
  const plistSource = jetpack.read(plistPath);

  const parsed = plist.parse(plistSource);
  parsed.UIAppFonts = UIAppFonts;

  const updated = plist.build(parsed);
  jetpack.write(plistPath, updated);

  spinner.succeed();
};
