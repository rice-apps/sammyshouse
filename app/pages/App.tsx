import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import EventCard, { eventCardFromData, parseEvent } from '../components/event/EventCard';
import IEvent from '../types/IEvent';
import AddProfile from './AddProfilePage';
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEvent from './AddEventPage';
import EventPage from './EventPage';
import FindEventsPage from './FindEventsPage';


const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  const [data, setData] : [IEvent[], any] = useState([]);
  useEffect(() => {
   fetch('http://localhost:3000/api/events/getAllEvents')
    .then(res => res.json())
    .then(events => events.map(parseEvent))
    .then(events => setData(events))
    .catch(e => console.log(e));
  }, []);
  /*
      <EventCard data={{
        eventName: 'Test Event',
        postedBy: 'Carson Foster',
        location: 'RMC Courtyard AAAA',
        dateTime: new Date('15 December 2022 1:48 PM')
      }} onPress={() => console.log("pressed")} onLike={(liked) => console.log(`liked: ${liked}`)}/>
  */
  const onPress = (_id: string) => {
    console.log(`event card with id ${_id} was pressed`);
  };
  const onLike = (_id: string, liked: boolean) => {
    console.log(`event card with id ${_id} is now ${liked ? 'liked' : 'not liked'}`);
  }
  return (
    <View style={styles.container}>
      {data.map(e => eventCardFromData(e, onPress, onLike))}
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
        <Button
        title="Add Profile"
        onPress={() => navigation.navigate('Add Profile', {
          email: 'test@rice.edu',
        })}   
      />
      <Button
        title="Add Event"
        onPress={() => navigation.navigate('Add Event')}
      />
      <Button
        title="Event Page"
        onPress={() => navigation.navigate('Event Page')}
      />
      <Button
        title="Find Events Page"
        onPress={() => navigation.navigate('Find Events Page')}
      />
      <StatusBar style="auto" />
    </View>
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Add Profile" component={AddProfile}/>
        <Stack.Screen name="Add Event" component={AddEvent}/>
        <Stack.Screen name="Event Page" component={EventPage}/>
        <Stack.Screen name="Find Events Page" component={FindEventsPage}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
