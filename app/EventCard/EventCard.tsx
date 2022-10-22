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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    },
    icon: {

    },
    big: {
        fontSize: 18,
    },
    bold: {
        fontWeight: 'bold'
    },
    inter: {
        fontFamily: 'inter'
    }
});

const EventCard = (props: {
    data: EventData,
}) => {
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
                <View>
                    <Image source={{ uri: props.data.imageURI }} style={styles.mainImage} />
                    <View style={styles.info}>
                        <Text style={[styles.inter, styles.bold, styles.big]}>{props.data.eventName}</Text>
                        <Text>{props.data.postedBy}</Text>
                        <View>
                            {/*<Image source={} style={styles.icon}/>*/}
                            <Text>{time}</Text>
                        </View>
                        <View>
                            {/*<Image source={require('@expo/snack-static/react-native-logo.png')} style={styles.icon}/>*/}
                            <Text>{props.data.location}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.dateInfo}>
                    <View style={{alignItems: 'flex-end'}}>
                        <Text>{month}</Text>
                        <Text style={styles.big}>{dayOfMonth}</Text>
                    </View>
                    <Text style={styles.bold}>{weekday}</Text>
                </View>
            </View>
        </View>
    );
};

export default EventCard;