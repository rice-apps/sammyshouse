import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme, Styles } from './Theme';
import ThreePageProgress from '../components/ThreePageProgress';
import ThemedButton from '../components/ThemedButton';

const sortingHeaders: string[] = [];

const FollowOrgs = (props: {

}) => {
    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf')
    });

    const [nextPressed, setNextPressed] = useState(false);

    if (!fontsLoaded) {
        return (<></>);
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <MaterialIcons name="keyboard-arrow-left" size={24} color={Theme.darkColor()} />
                <Text style={[styles.largeText, Styles.darkColor]}>Follow organizations</Text>
            </View>
            <View style={[styles.row, styles.bottom]}>
                <ThreePageProgress section={1} />
                <ThemedButton text="Next" pressed={nextPressed} onPressIn={() => setNextPressed(true)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: "95%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    largeText: {
        fontFamily: 'Inter',
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
    },
    bottom: {
        justifyContent: 'space-between',
        paddingLeft: "5%",
        width: '90%',
    },
});

export default FollowOrgs;