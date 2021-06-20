import * as React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import { useAppDispatch } from '../context/app.context';

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginSuccessful, setLoginSuccessful] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }
    database()
      .ref('/data')
      .once('value')
      .then(snapshot => {
        const centerData = snapshot.val();
        dispatch({
          type: 'SET_CENTER_DATA',
          data: centerData,
        });
        setLoginSuccessful(true);
      });
  };

  React.useEffect(() => {
    if (loginSuccessful) {
      database()
        .ref('/data')
        .on('value', snapshot => {
          const centerData = snapshot.val();
          dispatch({
            type: 'SET_CENTER_DATA',
            data: centerData,
          });
        });
      dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
    }
  }, [loginSuccessful, dispatch, navigation]);

  return (
    <View style={styles.signInScreen}>
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.cta}
        onPress={handleLogin}
        testID="::signIn-btn">
        <Text>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signInScreen: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    borderColor: '#f0f0f0',
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    marginTop: 10,
    padding: 10,
    height: 40,
  },
  cta: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    borderRadius: 100,
    height: 52,
    backgroundColor: '#f7c905',
  },
});
