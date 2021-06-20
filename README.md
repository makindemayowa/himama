### Run the App with Local Code

## Prereqs for Both Platforms
- Install yarn: [Mac](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
- Install yarn packages: `yarn`
- Start the React Native packager as a webserver: `yarn react-native start`

## iOS
- Follow above "Prereqs for Both Platforms".
- Install XCode
- Install Cocoapods: https://guides.cocoapods.org/using/getting-started.html
- Install Coacoapods dependencies: `cd ios && pod install --repo-update`
- Build app and start emulator: `yarn run ios`

## android
- Follow above "Prereqs for Both Platforms".
- Install Android Studio and [Oracle JDK](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html).
- On Android Studio's first run, configure it to install Android Virtual Device (AVD).
- Identify the location of your Android SDK [source](https://stackoverflow.com/questions/32634352/react-native-android-build-failed-sdk-location-not-found) (you might have chosen it in Android Studio's configuration). The lines below assume it's `/Users/USERNAME/Library/Android/sdk` so replace that below if necessary:
  - In the himama project, create a file `android/local.properties` with this line:
  - `sdk.dir = /Users/USERNAME/Library/Android/sdk`
- Build app and start emulator: `yarn run android`

### Tests
Components are tested with Jest and react-native-testing-library. To run the tests, use the command `yarn test`.

### Authentication
Authentication is not yet set up in the app and any random string in the username and password fields allow you in to the app.
