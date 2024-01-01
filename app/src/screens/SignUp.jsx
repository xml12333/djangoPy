import {useLayoutEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Input from '../common/Input';
import Button from '../common/Button';
import api from '../core/api';
import utils from '../core/utils';
import useGlobal from '../core/global';

const SignUpScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [password1Error, setPassword1Error] = useState('');
  const [password2Error, setPassword2Error] = useState('');

  const login = useGlobal(state => state.login);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  function onSignUp() {
    // check username
    const failUsername = !username || username.length < 5;
    if (failUsername) {
      setUsernameError('Username must be >= 5 characters');
    }
    const failFirstName = !firstName;
    if (failFirstName) {
      setFirstNameError('First Name not provided');
    }
    const failLastName = !lastName;
    if (failLastName) {
      setLastNameError('Last Name not provided');
    }
    // check password
    const failPassword1 = !password1 || password1 < 8;
    if (failPassword1) {
      setPassword1Error('Password must be >= 8 characters');
    }
    const failPassword2 = password1 !== password2;
    if (failPassword2) {
      setPassword2Error("Passwords don't match");
    }
    // break out of this function if there were any issues
    if (
      failUsername ||
      failPassword1 ||
      failPassword2 ||
      failFirstName ||
      failLastName
    ) {
      return;
    }
    // make signin request
    // make signin request
    api({
      method: 'POST',
      url: '/chat/signup/',
      data: {
        username,
        first_name: firstName,
        last_name: lastName,
        password: password1,
      },
    })
      .then(response => {
        const credentials = {
          username,
          password: password1,
        };
        // utils.log('Sign Up:', response.data);
        login(credentials, response.data.user, response.data.tokents);
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
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 16}}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 24,
                fontSize: 36,
                fontWeight: 'bold',
                color: '#202020',
              }}>
              Sign Up
            </Text>
            <Input
              title="Username"
              value={username}
              setValue={setUsername}
              error={usernameError}
              setError={setUsernameError}
            />
            <Input
              title="First Name"
              value={firstName}
              setValue={setFirstName}
              error={firstNameError}
              setError={setFirstNameError}
            />
            <Input
              title="Last Name"
              value={lastName}
              setValue={setLastName}
              error={lastNameError}
              setError={setLastNameError}
            />
            <Input
              title="Password"
              value={password1}
              setValue={setPassword1}
              error={password1Error}
              setError={setPassword1Error}
              secureTextEntry={true}
            />
            <Input
              title="Retype Password"
              value={password2}
              setValue={setPassword2}
              error={password2Error}
              setError={setPassword2Error}
              secureTextEntry={true}
            />
            <Button title="Sing Up" onPress={onSignUp} />
            <Text
              style={{
                textAlign: 'center',
                marginTop: 40,
              }}>
              Already have an account?{' '}
              <Text style={{color: 'blue'}} onPress={() => navigation.goBack()}>
                Sign In
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
