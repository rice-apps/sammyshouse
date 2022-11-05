import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EventCard, { eventCardsFromData } from './EventCard/EventCard';
import IEvent from './IEvent';

export default function App() {
  const [data, setData] : [IEvent[], any] = useState([]);
  useEffect(() => {
   fetch('http://localhost:3000/api/getAllEvents').then(res => res.json()).then(events => setData(events)).catch(e => console.log(e));
  }, []);
  /*
      <EventCard data={{
        eventName: 'Event',
        postedBy: 'Carson Foster',
        location: 'Lilie Lab',
        dateTime: new Date('15 December 2022 1:48 PM')
      }} onPress={() => console.log("pressed")} onLike={(liked) => console.log(`liked: ${liked}`)}/>
  */
  return (
    <View style={styles.container}>
      {'eventCardsFromData(data)'}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
