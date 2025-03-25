import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login/Login';
import Search from './screens/Search/Search';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'login'} component={Login} />
        <Stack.Screen name={'search'} component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
