import React from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import eventPage from './eventPage';

export default function App() {
  const navigate = useNavigate();
  const navigateToEventPage = () => {
    navigate('./eventPage'); 
  } 

  return (
    <View style={styles.container}>
      <button onClick = {navigateToEventPage}>Event Page</button>
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
