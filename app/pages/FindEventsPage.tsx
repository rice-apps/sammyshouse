import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View, Text, TextInput, SafeAreaView} from 'react-native';
import { Theme } from './Theme';
import IEvent, { IEventIntermediate } from '../types/IEvent';
import { FindEventsProps } from '../types/PropTypes';
import { parseEvent, eventCardFromData } from '../components/event/EventCard';
import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';
import { happeningTodayEventFromData } from '../components/event/HappeningTodayEvent';

const server = "http://localhost:3000";

const FindEventsPage = (props: FindEventsProps) => {
    /*
     * TODO: go back to server-side, get only upcoming events (?),
     * get only events today (?), filtered by string (?), and
     * filtered by usering following (?)
     */
    const [following, setFollowing] = useState(false);
    const [searchFilter, setSearchFilter] = useState<string>(undefined);
    const [events, setEvents] = useState<IEvent[]>([]);
    
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf'),
    });

    /*
     * TODO: fix fetch to be based on updated backend queries
     * and then update the dependencies list to match, e.g.
     * [following, searchFilter].
     */
    useEffect(() => {
        fetch(`${server}/api/events/getAllEvents`)
          .then(res => res.json())
          .then((json: IEventIntermediate[]) => {
            setEvents(json.map(parseEvent));
            console.log("Got events successfully!");
          })
          .catch(err => {
            console.log(`Error fetching events: ${err}`);
          });
    }, []);

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
                <SafeAreaView style={styles.container}>
                    <FlatList data={events} horizontal={true} renderItem={({item}) => happeningTodayEventFromData(
                        item,
                        (id) => console.log(`Happening today event ${id} was pressed`),
                        (id, liked) => console.log(`Happening today event ${id} is now ${liked ? '' : 'not '}liked`)
                    )}/>

                </SafeAreaView>
            </View>
            {/* Upcoming */}
            <Text style={[styles.headerText, {marginLeft: 10, marginBottom: 10}]}>Upcoming</Text>
            {/* Vertical scrolling box of upcoming events */}
            <View style={styles.upcoming}>
                <FlatList data={events} renderItem={({item}) => eventCardFromData(
                    item,
                    (id) => console.log(`Event ${id} pressed`),
                    (id, liked) => console.log(`Event ${id} is now ${liked ? '' : 'not '}liked`)
                )} ItemSeparatorComponent={() => <View style={{height: 10}}></View>}/>
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
    },
    upcoming: {
        alignItems: 'center'
    }
});

export default FindEventsPage;