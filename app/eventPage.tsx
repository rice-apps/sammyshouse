import React from 'react';
import '/eventPage.css'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';

const imageToAdd = require( "../allendong/FZVRfKEXoAQTH8U.jpg");

export default function eventPage() {
  return ( <View>
    // styling later. Fields are just placeholder, will import them later

    <img src = {imageToAdd} alt = "Image" />
    <Text>
        <Text className="eventName">Event Name</Text> <br/>
        <Text className="eventdetail">Host Name </Text> <br/>
        <Text className="eventdetail">Day, Date, and Time</Text> <br/>
        <Text className="eventdetail">Location</Text>
    </Text>
    </View>
  );
}
