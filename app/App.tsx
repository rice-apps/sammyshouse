import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import EventPage from './eventPage';

export default function App() {


  return (

    <View style={styles.container}>
      <Text>Hello</Text>
      <EventPage></EventPage>
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
