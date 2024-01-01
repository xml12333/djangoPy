import {useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Title from '../common/Title';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';

const SignInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const login = useGlobal(state => state.login);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  function onSignIn() {
    // check username
    const failUsername = !username;
    if (failUsername) {
      setUsernameError('Username not provided');
    }
    // check password
    const failPassword = !password;
    if (failPassword) {
      setPasswordError('Password not provided');
    }
    // break out of this function if there were any issues
    if (failUsername || failPassword) {
      return;
    }
    // make signin request
    api({
      method: 'POST',
      url: '/chat/signin/',
      data: {
        username,
        password,
      },
    })
      .then(response => {
        // utils.log('Sign In:', response.data);
        const credentials = {
          username,
          password,
        };
        login(credentials, response.data.user, response.data.tokens);
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Title text="RealtimeChat" color="#202020" />
            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
            />
            <Input
              title="Password"
              value={password}
              setValue={setPassword}
              error={passwordError}
              setError={setPasswordError}
              secureTextEntry={true}
            />
            <Button title="SignIn" onPress={onSignIn} />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
              }}>
              Don't have an account?{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => navigation.navigate('SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
