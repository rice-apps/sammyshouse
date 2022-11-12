import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { BottomNavigation, Text, Card, Button} from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { brotliDecompress } from 'zlib';
import EventPage from "./EventPage"; 

// need to add functionality to commands, just placeholders for now. 

export default function App() {
  return (
    <EventPage/>
    );
  }