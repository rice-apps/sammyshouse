import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import EventData from './EventData';

const defaultImageURI: string = 'https://brand.rice.edu/sites/g/files/bxs2591/files/2019-08/190308_Rice_Mechanical_Brand_Standards_Logos-2.png';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        width: "90%",
        height: "90%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    dateInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    mainImage: {
        width: 106,
        height: 90
    },
    icon: {

    },
    big: {
        fontSize: 18,
    },
    bold: {
        fontFamily: 'InterBold'
    },
    inter: {
        fontFamily: 'Inter'
    },
    row: {
        flexDirection: 'row'
    }
});

const EventCard = (props: {
    data: EventData,
}) => {
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf')
    });

    if (!fontsLoaded) {
        return null;
    }

    const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(props.data.dateTime);
    const weekday: string = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(props.data.dateTime).toUpperCase();
    const dayOfMonth: string = props.data.dateTime.getDate().toString();
    const time: string = props.data.dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (props.data.imageURI == undefined) {
        props.data.imageURI = defaultImageURI;
    }

    return (
        <View style={styles.card}>
            <View style={styles.inner}>
                <View style={styles.leftSide}>
                    <Image source={{ uri: props.data.imageURI }} style={styles.mainImage} />
                    <View style={styles.info}>
                        <Text style={[styles.bold, styles.big]}>{props.data.eventName}</Text>
                        <View style={styles.row}>
                            <Text style={styles.inter}>by </Text>
                            <Text style={styles.bold}>{props.data.postedBy}</Text>
                        </View>
                        <View style={styles.row}>
                            <FontAwesome5 name="clock" size={15} color="black" />
                            <Text style={styles.inter}>{time}</Text>
                        </View>
                        <View>
                            <Text style={styles.inter}>{props.data.location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dateInfo}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text style={styles.bold}>{weekday}</Text>
                        <Text style={styles.inter}>{month}</Text>
                        <Text style={[styles.inter, styles.big]}>{dayOfMonth}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EventCard;