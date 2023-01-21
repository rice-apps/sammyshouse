import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type College = "Baker" | "Will Rice" | "Hanszen" |
    "Wiess" | "Jones" | "Brown" | "Lovett" |
    "Sid Rich" | "Martel" | "McMurtry" | "Duncan";

const collegeData: {item: College}[] = [
    {item: "Baker"},
    {item: "Will Rice"},
    {item: "Hanszen"},
    {item: "Wiess"},
    {item: "Jones"},
    {item: "Brown"},
    {item: "Lovett"},
    {item: "Sid Rich"},
    {item: "Martel"},
    {item: "McMurtry"},
    {item: "Duncan"}
];

const currentYear: number = new Date().getFullYear();
const yearData: {
    label: string,
    value: number
}[] = [];
for (let i = 0; i < 6; i++) {
    let graduation = i + currentYear;
    yearData.push({ label: graduation.toString(), value: graduation });
}

const AddProfile = (props: {
    email: string,
}) => {
    const [fontsLoaded] = useFonts({
        Inter: require('./assets/fonts/Inter-Regular.otf'),
        InterBold: require('./assets/fonts/Inter-Bold.otf')
    });

    const [name, setName] = useState("");
    const [college, setCollege] = useState<College | undefined>();
    const [year, setYear] = useState(0); // TODO: check
    const [photo, setPhoto] = useState<string | undefined>();

    const register = () => {
        console.log(`'${name}' (${props.email}) at ${college} with year ${year}`);
    };

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            {/* TODO: add picture adder */}
            <View style={styles.row}>
                <FontAwesome5 name="star" size={15} color="black" />
                <TextInput placeholder="Name" placeholderTextColor="grey" style={styles.outline}
                    onChangeText={text => setName(text)}></TextInput>
            </View>
            <View style={styles.row}>
                <FontAwesome5 name="university" size={15} color="black" />
                <Dropdown placeholder="College" data={collegeData} labelField="item" valueField="item" onChange={obj => setCollege(obj.item)} />
            </View>
            <View style={styles.row}>
                <FontAwesome5 name="calendar-alt" size={15} color="black" />
                <Dropdown placeholder="Graduation Year" data={yearData} labelField="label" valueField="value" onChange={obj => setYear(obj.value)} />
            </View>
            <Button title="Register" onPress={register}/>
        </View>
    );
}

export default AddProfile;

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