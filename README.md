# React Native tvOS App Generator

Yeoman generator to help you bootstrap your React Native tvOS (v0.54.1) project in seconds. You will get a functional app including navigation, redux, a local server ready for async calls, containers, screens, ready to use components, themes (styled components), translation.  

## A. Generate the React Native tvOS app on your Mac

1. Install yo

```sh
$ npm i -g yo
```

2. Use the generator (it may tell you to install / upgrade `node`, `yarn`, `react-native-cli`)

```sh
$ yo react-native-tvos
```

3. Define the app screens
    1. Title
    2. Included components per screen, one or more of these: Featured List, Poster List (has pagination), Category List

4. Change into the app folder

## B. Start the backend API in terminal window

1. Verify .env file from app folder to make sure it is using your Mac local ip address

2. Start API server

```sh
$ yarn run server
```

3. Make sure your Apple TV is connected to the same LAN as your Mac

4. If your Apple TV cannot access the API running on your Mac, you may have to check your firewall settings and / or expose port `3000` on your Mac

## C. Xcode setup

1. From app folder link react native libraries

```sh
$ react-native link
```

2. Edit `Info.plist` from `ios/[appName]-tvOS` folder to add fonts (insert this right before the last `</dict>`)

```sh
  <key>UIAppFonts</key>
  <array>
    <string>Roboto-Black.ttf</string>
    <string>Roboto-BlackItalic.ttf</string>
    <string>Roboto-Bold.ttf</string>
    <string>Roboto-BoldItalic.ttf</string>
    <string>Roboto-Italic.ttf</string>
    <string>Roboto-Light.ttf</string>
    <string>Roboto-LightItalic.ttf</string>
    <string>Roboto-Medium.ttf</string>
    <string>Roboto-MediumItalic.ttf</string>
    <string>Roboto-Regular.ttf</string>
    <string>Roboto-Thin.ttf</string>
    <string>Roboto-ThinItalic.ttf</string>
    <string>Ubuntu-Bold.ttf</string>
    <string>Ubuntu-BoldItalic.ttf</string>
    <string>Ubuntu-Italic.ttf</string>
    <string>Ubuntu-Light.ttf</string>
    <string>Ubuntu-LightItalic.ttf</string>
    <string>Ubuntu-Medium.ttf</string>
    <string>Ubuntu-MediumItalic.ttf</string>
    <string>Ubuntu-Regular.ttf</string>
    <string>Lato-Black.ttf</string>
    <string>Lato-BlackItalic.ttf</string>
    <string>Lato-Bold.ttf</string>
    <string>Lato-BoldItalic.ttf</string>
    <string>Lato-ExtraBold.ttf</string>
    <string>Lato-ExtraBoldItalic.ttf</string>
    <string>Lato-ExtraLight.ttf</string>
    <string>Lato-ExtraLightItalic.ttf</string>
    <string>Lato-Italic.ttf</string>
    <string>Lato-Light.ttf</string>
    <string>Lato-LightItalic.ttf</string>
    <string>Lato-Medium.ttf</string>
    <string>Lato-MediumItalic.ttf</string>
    <string>Lato-Regular.ttf</string>
    <string>Lato-SemiBold.ttf</string>
    <string>Lato-SemiBoldItalic.ttf</string>
    <string>Lato-Thin.ttf</string>
    <string>Lato-ThinItalic.ttf</string>
    <string>Entypo.ttf</string>
    <string>EvilIcons.ttf</string>
    <string>Feather.ttf</string>
    <string>FontAwesome.ttf</string>
    <string>Foundation.ttf</string>
    <string>Ionicons.ttf</string>
    <string>MaterialCommunityIcons.ttf</string>
    <string>MaterialIcons.ttf</string>
    <string>Octicons.ttf</string>
    <string>SimpleLineIcons.ttf</string>
    <string>Zocial.ttf</string>
  </array>
```

3. Open `ios/[appName].xcodeproj` with Xcode

4. Change device to be able to run tvOS target

5. Change the target to `[appName]-tvOS` you have to run, from Xcode centre section

6. Under `[appName]-tvOS` `General Settings`, automatically manage signing for targets `[appName]-tvOS` and `[appName]-tvOSTests` (use the same Apple ID profile you have on your Apple TV, if this the case)

7. Add `libRNFS.a` and `libRCTVideo.a` libraries (tvOS versions) to `Linked Frameworks and Libraries`

8. Under Build Phase, make sure you have all the fonts added under `Copy Bundle Resources`: `Lato`, `Roboto`, `Ubuntu` (the whole font families must be added) and `FontAwesome`

9. From Deployment Info, change Deployment Target to 10.0

10. Run it on Apple TV device or Apple TV simulator

11. Using the activation code on the first screen, open `backend/activation.json` file and set the field `activated` to `true` for that `activationCode`. Close the file `backend/activation.json` after you finish editing.

12. Enjoy
