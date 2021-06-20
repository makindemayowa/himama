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


### Please describe your process for approaching the code challenge.
The first thing I did was understand the problem statement fully, which daily rostering of kids in each classroom.
I proceeded to look through the sample input to be sure what the data form was and this informed the flow of the app.

### What kind of planning did you do? Did your plans change as you began coding?
I started by choosing if I would be using a front-end framework(react) or native mobile development technology(react native), after this, I planned the test frameworks to use. Then I proceeded to data storage and user authentication.
Some plans changed, an example was that I started out using react-native-async-storage because of time constraint and eventually migrated the work done to firebase real-time storage when time.

### Is there anything you’d like to add or mention in regards to the app design and navigation you chose?
For navigation, I chose React Navigation since it provides a straightforward navigation solution, with common stack navigation patterns on both Android and iOS.
For now, the allClassroomsAccessible key is toggled manually in the database, and the state of the key affects what teachers can do on the app

### If you were given another day to work on this, how would you spend it? What if you were given a month?
If I were given a day, I would work on cleaning up the app as is to work seamlessly on both android and iOS. It currently works on both platforms, but the header and the cards look janky at the moment.
Also, I would add more tests before the codebase gets bigger to improve the code quality and encourage contributions from other developers.

#### What if you were given a month?
Setup CI flow for testing and ios + android builds.
Add more features to the app such as 
- user authentication
- admin dashboard to set teachers access to classes
- adding timestamp to check-in/out time 
- student journey(log of classes a child has attended as they move between classes)
- child dashboard which is visible to both parent and teacher to showcase child's activities and teacher's observation. 
