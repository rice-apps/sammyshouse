import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { Avatar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// need to add functionality to commands, just placeholders for now. 

export default function App() {

  const [text, setText] = React.useState("");
  const _goBack = () => console.log('Went back');
  const _handleMore = () => console.log('Shown more');
  const HomeRoute = () => <Text>Home</Text>;
  const AddRoute = () => <Text>Add</Text>;
  const MeRoute = () => <Text>Me</Text>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'add', title: 'Add', focusedIcon: 'plus' },
    { key: 'me', title: 'Me', focusedIcon: 'account-circle-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    add: AddRoute,
    me: MeRoute,
  });

  return (
    <PaperProvider>
      <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="" />
      <Text variant="headlineSmall" textAlign = 'right' > price? </Text>
      <Appbar.Action icon="heart" onPress={_handleMore} />
      </Appbar.Header>
    <View style={styles.container}>
      <Text>Event Name </Text>
      <Text>Hosted by </Text>
      <Text>User Profile</Text>
      <Icon name="calendar-blank-outline"/>
      <Text>Day, Date, at Time</Text>
      <Icon name="map-marker"/>
      <Text>Location</Text>
      
    </View>
    <TextInput
      style={textStyles.input}
      label="descrip 1"
      value={text}
      onChangeText={text => setText(text)}
    />
    <TextInput
      style={textStyles.input}
      label="descrip 2"
      value={text}
      onChangeText={text2 => setText(text2)}
    />
    <TextInput
      style={textStyles.input}
      label="descrip 3"
      value={text}
      onChangeText={text3 => setText(text3)}
    />
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const textStyles = StyleSheet.create({
  input: {
    height: 30,
    margin: 12,
    borderWidth: 3,
    padding:10,
  },
});