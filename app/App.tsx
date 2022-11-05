import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EventCard from './EventCard/EventCard';
import AddEvent from './pages/AddEvent';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <EventCard data={{
        eventName: 'Event',
        postedBy: 'Carson Foster',
        location: 'Lilie Lab',
        dateTime: new Date('15 December 2022 1:48 PM')
      }} onPress={() => console.log("pressed")} onLike={(liked) => console.log(`liked: ${liked}`)}/> */}
      <StatusBar style="auto" />

      <AddEvent></AddEvent>
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
