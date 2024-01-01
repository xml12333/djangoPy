import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect, useLayoutEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {RequestsScreen, FriendsScreen, ProfileScreen} from '.';
import useGlobal from '../core/global';
import Thumbnail from '../common/Thumbnail';

const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const socketConnect = useGlobal(state => state.socketConnect);
  const socketClose = useGlobal(state => state.socketClose);
  const user = useGlobal(state => state.user);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    socketConnect();
    return () => {
      socketClose();
    };
  });
  function onSearch() {
    navigation.navigate('Search');
  }
  return (
    <Tab.Navigator
      screenOptions={({route, navigarion}) => ({
        headerLeft: () => (
          <View style={{marginLeft: 16}}>
            <Thumbnail url={user.thumbnail} size={29} />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSearch}>
            <FontAwesomeIcon
              style={{marginRight: 16}}
              icon="magnifying-glass"
              size={22}
              color="#404040"
            />
          </TouchableOpacity>
        ),
        tabBarIcon: ({focused, color, size}) => {
          const icons = {
            Requests: 'bell',
            Friends: 'inbox',
            Profile: 'user',
          };
          const icon = icons[route.name];
          return <FontAwesomeIcon icon={icon} size={20} color={color} />;
        },
        tabBarActiveTintColor: '#202020',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Requests" component={RequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
