import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text, TextInput } from 'react-native';
import { Theme } from './Theme';
import { FindEventsProps } from '../types/PropTypes';

const FindEventsPage = (props: FindEventsProps) => {
    const [following, setFollowing] = useState(false);

    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.background}>
            {/* "All", "Following" buttons row */}
            <View></View>
            {/* Search bar */}
            <View></View>
            {/* Happening today */}
            <View>
                <Text>Happening today</Text>
                {/* Horizontal scrolling box of events happening today */}
                <ScrollView horizontal={true}>
                    
                </ScrollView>
            </View>
            {/* Upcoming */}
            <View>
                <Text>Upcoming</Text>
                {/* Vertical scrolling box of upcoming events */}
                <ScrollView></ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Theme.lightColor(),
        flexDirection: "column",
        justifyContent: "center",
    },
});

export default FindEventsPage;