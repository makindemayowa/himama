import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SingleClass from './src/Classes/SingleClass';
import AllClasses from './src/Classes/AllClasses';
import SignInScreen from './src/SignIn/SignIn';
import {
  AppProvider,
  useAppDispatch,
  useAppState,
} from './src/context/app.context';

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const HomeStack = createStackNavigator();
const HomeNavigator = () => {
  const dispatch = useAppDispatch();
  const signOut = () => dispatch({ type: 'SIGN_OUT' });
  const HeaderRight = () => (
    <TouchableOpacity style={styles.logoutBtn} onPress={signOut}>
      <Text style={styles.logoutBtnText}>Sign out</Text>
    </TouchableOpacity>
  );
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'Class'}
        initialParams={{ classIdx: null }}
        component={SingleClass}
        options={{
          headerRight: HeaderRight,
        }}
      />
      <HomeStack.Screen
        name={'AllClasses'}
        component={AllClasses}
        options={{
          headerRight: HeaderRight,
        }}
      />
    </HomeStack.Navigator>
  );
};

export const Navigator = () => {
  const Stack = createStackNavigator();
  const dispatch = useAppDispatch();
  const state = useAppState();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [dispatch]);

  return (
    <Stack.Navigator>
      {state.isLoading ? (
        <Stack.Screen name="Splash" component={SplashScreen} />
      ) : state.userToken == null ? (
        <Stack.Screen
          name="Sign In"
          component={SignInScreen}
          options={{
            title: 'Sign in',
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
      ) : (
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MenuProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </MenuProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    padding: 10,
  },
  logoutBtnText: {
    color: '#307f7b',
  },
});
