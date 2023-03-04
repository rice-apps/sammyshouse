import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, View, Text, TextInput } from 'react-native';

const FindEventsPage = (props: {

}) => {
    const [following, setFollowing] = useState(false);

    return (
        <View>
            {/* "All", "Following" buttons row */}
            <View></View>
            {/* Search bar */}
            <View></View>
            {/* Happening today */}
            <View>
                <Text>Happening today</Text>
                {/* Horizontal scrolling box of events happening today */}
                <ScrollView></ScrollView>
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

export default FindEventsPage;
