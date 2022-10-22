import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import EventData from './EventData';

const defaultImageURI: string = 'https://brand.rice.edu/sites/g/files/bxs2591/files/2019-08/190308_Rice_Mechanical_Brand_Standards_Logos-2.png';

const styles = StyleSheet.create({
    mainImage: {

    },
    icon: {

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
        <View>
            <Image source={{ uri: props.data.imageURI }} style={styles.mainImage} />
            <View>
                <Text>{props.data.eventName}</Text>
                <Text>{props.data.postedBy}</Text>
                <View>
                    <Image source={require('@expo/snack-static/react-native-logo.png')} style={styles.icon}/>
                    <Text>{time}</Text>
                </View>
                <View>
                    <Image source={require('@expo/snack-static/react-native-logo.png')} style={styles.icon}/>
                    <Text>{props.data.location}</Text>
                </View>
            </View>
            <View>
                <Text>{month}</Text>
                <Text>{dayOfMonth}</Text>
                <Text>{weekday}</Text>
            </View>
        </View>
    );
};

export default EventCard;