# React Native tvOS App Generator

Yeoman generator to help you bootstrap your React Native tvOS (v0.54.1) project in seconds. You will get a functional application including navigation, redux, a local server ready for async calls, containers, screens, ready to use components, themes (styled components), i18n.  

## A. Generate the React Native tvOS app on your Mac

1. Install yo

   ```sh
   npm i -g yo
   ```

2. Install the generator

   ```sh
   npm i -g generator-react-native-tvos
   ```

3. Use the generator (it may tell you to install / upgrade `node`, `yarn`, `react-native-cli`)

   ```sh
   yo react-native-tvos
   ```

4. Define the app screens
   1. Screen title
   2. Included components per screen, one or more of these: Featured List, Poster List (has pagination), Category List

5. Change into the app folder

## B. Start the backend API in a terminal window

1. Verify .env file from app folder to make sure it is using your Mac local ip address

2. Start API server

   ```sh
   yarn run server
   ```

3. Make sure your Apple TV is connected to the same LAN as your Mac

4. If your Apple TV cannot access the API running on your Mac, you may have to check your firewall settings and / or expose port `3000` on your Mac

## C. Xcode setup

1. From app folder link react native libraries

   ```sh
   react-native link
   ```

2. Open `ios/[appName].xcodeproj` with Xcode

3. Change device to be able to run tvOS target

4. Change the target to `[appName]-tvOS` you have to run, from Xcode centre section

5. Under `[appName]-tvOS` `General Settings`, automatically manage signing for targets `[appName]-tvOS` and `[appName]-tvOSTests` (use the same Apple ID profile you have on your Apple TV, if this the case)

6. Add `libRNFS.a` and `libRCTVideo.a` libraries (tvOS versions) to `Linked Frameworks and Libraries`

7. Under Build Phase, make sure you have all the fonts added under `Copy Bundle Resources`: `Lato`, `Roboto`, `Ubuntu` (the whole font families must be added) and `FontAwesome`

8. From Deployment Info, change Deployment Target to 10.0

9. Run it on Apple TV device or Apple TV simulator

10. Using the activation code on the first screen, open `backend/activation.json` file and set the field `activated` to `true` for that `activationCode`. Close the file `backend/activation.json` after you finish editing.

11. Enjoy
