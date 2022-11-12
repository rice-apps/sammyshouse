import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View} from 'react-native';

const HomeRoute = () => <View></View>;
const AddRoute = () => <View></View>;
const MeRoute = () => <View></View>;

const BottomNavigation = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'home', title: 'Home', focusedIcon: 'home-outline'},
      { key: 'add', title: 'Add', focusedIcon: 'plus-circle-outline' },
      { key: 'me', title: 'Me', focusedIcon: 'account-circle-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        add: AddRoute,
        me: MeRoute,
      });
    
  return (
    <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
  />
  );
};

export default BottomNavigation;