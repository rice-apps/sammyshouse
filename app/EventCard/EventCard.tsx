import { useFonts } from 'expo-font';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EventData from './EventData';

const defaultImageURI: string = 'https://brand.rice.edu/sites/g/files/bxs2591/files/2019-08/190308_Rice_Mechanical_Brand_Standards_Logos-2.png';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: '20%',
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
        height: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        height: '80%',
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
        height: 90,
        marginRight: '5%'
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
    iconGroup: {
        width: '100%',
        flexDirection: 'row'
    },
    marginRight: {
        marginRight: '10%'
    },
    row: {
        flexDirection: 'row'
    },
    rightSide: {
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        height: '72%'
    }
});

const EventCard = (props: {
    data: EventData,
    onPress: () => void
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

    let mainImage = (props.data.imageURI == undefined ? 
        (<View style={[styles.mainImage, {backgroundColor: '#d9d9d9', borderRadius: 5}]}></View>)
    : (<Image source={{ uri: props.data.imageURI }} style={styles.mainImage} />));

    return (
        <TouchableOpacity style={styles.card} onPress={props.onPress}>
            <View style={styles.inner}>
                <View style={styles.leftSide}>
                    {mainImage}
                    <View style={styles.info}>
                        <View style={{width: '100%', height: '40%', justifyContent: 'space-between'}}>
                            <Text style={[styles.bold, styles.big]}>{props.data.eventName}</Text>
                            <View style={styles.row}>
                                <Text style={styles.inter}>by </Text>
                                <Text style={styles.bold}>{props.data.postedBy}</Text>
                            </View>
                        </View>
                        <View style={{width:'100%', height: '35%', justifyContent: 'space-between'}}>
                            <View style={styles.iconGroup}>
                                <FontAwesome5 name="clock" size={15} color="black" style={styles.marginRight}/>
                                <Text style={styles.inter}>{time}</Text>
                            </View>
                            <View style={styles.iconGroup}>
                                <Ionicons name="location-sharp" size={15} color="black" style={styles.marginRight}/>
                                <Text style={styles.inter}>{props.data.location}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.rightSide}>
                    <View style={styles.dateInfo}>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={styles.bold}>{weekday}</Text>
                            <Text style={styles.inter}>{month}</Text>
                            <Text style={[styles.inter, styles.big]}>{dayOfMonth}</Text>
                        </View>
                    </View>
                    <FontAwesome5 name="heart" size={20} color="black" style={{textAlign: 'right'}}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default EventCard;