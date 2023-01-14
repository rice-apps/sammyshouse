import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

type College = "Baker" | "Will Rice" | "Hanszen" |
    "Wiess" | "Jones" | "Brown" | "Lovett" |
    "Sid Rich" | "Martel" | "McMurtry" | "Duncan";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%"
    },
    row: {
        flexDirection: "row" 
    },
    outline: {
        padding: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        borderRadius: 5,
    }
});

// TODO: take email as a prop
const AddProfile = (props: {

}) => {
    const [fontsLoaded] = useFonts({
        Inter: require('./assets/fonts/Inter-Regular.otf'),
        InterBold: require('./assets/fonts/Inter-Bold.otf')
    });

    const [name, setName] = useState("");
    const [college, setCollege] = useState<College | undefined>();
    const [year, setYear] = useState(0); // TODO: check
    const [photo, setPhoto] = useState<string | undefined>();

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* TODO: add picture adder */}
            <View style={styles.row}>
                <FontAwesome5 name="star" size={15} color="black" />
                <TextInput placeholder="Name" placeholderTextColor="grey" style={styles.outline}></TextInput>
            </View>
            <View style={styles.row}>
                <FontAwesome5 name="university" size={15} color="black" />
                <Text>College Dropdown Here</Text>
            </View>
            <View style={styles.row}>
                <FontAwesome5 name="calendar-alt" size={15} color="black" />
                <Text>Year Dropdown Here</Text>
            </View>
        </View>
    );
}

export default AddProfile;