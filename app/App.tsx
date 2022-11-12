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
  
  return (
    <EventPage/>
    );
    
  }