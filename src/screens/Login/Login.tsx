import {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {User} from '../../dataTypes/User';
import InnoventesInput from '../../components/InnoventesInput/InnoventesInput';
import InnoventesButton from '../../components/InnoventesButton/InnoventesButton';

const Login = (): React.JSX.Element => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginUser = () => {};

  return (
    <View style={{flex: 1, marginTop: 200, gap: 16, paddingHorizontal: 16}}>
      <Text style={{fontSize: 32}}>Welcome Warrier!</Text>
      <InnoventesInput
        setValue={setUserName}
        value={username}
        placehoolder="Enter User Name"
      />
      <InnoventesInput
        setValue={setPassword}
        value={password}
        placehoolder="Enter Password"
      />
      <InnoventesButton title="Login" onPress={loginUser} />
    </View>
  );
};

export default Login;
