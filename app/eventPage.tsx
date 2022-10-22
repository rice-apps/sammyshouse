import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';

//const imageToAdd = require( "../allendong/FZVRfKEXoAQTH8U.jpg");

export default function EventPage() {
  return ( <View>
    <Text>
        <Text className="eventName">Event Name</Text> 
        <Text classrame="eventdetail">Host Name </Text> 
        <Text className="eventdetail">Day, Date, and Time</Text>
        <Text classrName="eventdetail">Location</Text>
    </Text>
    </View>
  );
}
