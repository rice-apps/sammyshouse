import React, { useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text, Card, Button} from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { brotliDecompress } from 'zlib';
import EventPage from "./EventPage"; 
import EventCard, { eventCardFromData, parseEvent } from './EventCard/EventCard';
import IEvent from './IEvent';
import BottomBar from "./BottomBar"; 

// need to add functionality to commands, just placeholders for now. 

export default function App() {
  const [data, setData] : [IEvent[], any] = useState([]);
  useEffect(() => {
   fetch('http://localhost:3000/api/getAllEvents')
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
