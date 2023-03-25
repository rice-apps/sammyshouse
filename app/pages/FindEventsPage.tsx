import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View, Text, TextInput, SafeAreaView} from 'react-native';
import { Theme } from './Theme';
import { FindEventsProps } from '../types/PropTypes';
import HappeningToday from '../components/HappeningToday';

const FindEventsPage = (props: FindEventsProps) => {
    const [following, setFollowing] = useState(false);
    const [searchFilter, setSearchFilter] = useState<string>(undefined);
    
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf'),
    });

    const searchHandler = (text: string) => {
        if (text.length == 0) {
            setSearchFilter(undefined);
        } else {
            setSearchFilter(text);
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.background}>
            <View style={{ flexDirection:"row" }}>
                <View style={styles.buttonSpace}>
                    <Pressable style={[styles.button, {
                        backgroundColor: following ? 'transparent' : Theme.mainColor()
                    }]} onPress={() => setFollowing(false)}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: following ? 'Inter' : 'InterBold',
                            color: following ? Theme.mainColor() : 'white',
                        }}>All</Text>
                    </Pressable>
                    <Pressable style={[styles.button, {
                        backgroundColor: following ? Theme.mainColor() : 'transparent'
                    }]} onPress={() => setFollowing(true)}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: following ? 'InterBold' : 'Inter',
                            color: following ? 'white' : Theme.mainColor(),
                        }}>Following</Text>
                    </Pressable>
                </View>
            </View>
            <View></View>
            {/* Search bar */}
            <View style={styles.search}>
                <Ionicons name="search-sharp" size={18} color={Theme.mainColor()} style={styles.searchIcon}/>
                <TextInput style={styles.searchText} placeholder="Search" placeholderTextColor={Theme.greyColor()}
                    onChangeText={searchHandler}/>
            </View>
            {/* Happening today */}
            <View style={styles.container}>
                <Text style={styles.headerText}>Happening today</Text>
                {/* Horizontal scrolling box of events happening today */}
                <ScrollView horizontal={true}>
                    
                </ScrollView>
            </View>
            {/* Upcoming */}
            <View style={styles.container}>
                <Text style={styles.headerText}>Upcoming</Text>
                {/* Vertical scrolling box of upcoming events */}
                <SafeAreaView style={styles.container}>
                    <ScrollView>
                    <UpcomingEvent
                        imageUrl="////"
                        title="Event title"
                        description="by ..."
                    />
                    <UpcomingEvent
                        imageUrl="////"
                        title="Event title"
                        description="by ..."
                    />  
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Theme.lightColor(),
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    container: {
        marginLeft: 10,
    },
    headerText: {
        fontFamily: "InterBold",
        fontSize: 16,
        color: Theme.darkColor(),
    },
    search: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        backgroundColor: "#ffffff",
        width: "90%",
        height: 35,
        borderRadius: 35/2,
    },
    searchText: {
        fontFamily: "Inter",
        fontSize: 14,
        width: "86%",
        marginLeft: "2%",
    },
    searchIcon: {
        alignSelf: 'center',
        marginLeft: "2%",
        width: 20,
        height: 20,
    },
    button: {
        paddingVertical: 7,
        paddingHorizontal: 17,
        borderRadius: 10,
        elevation: 3,
    },
    buttonSpace: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default FindEventsPage;