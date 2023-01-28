import { useFonts } from 'expo-font';
import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Theme, Styles } from './Theme';
import { AddProfileProps } from '../types/PropTypes';

// TODO: figure out below constants
const server: string = "http://localhost:3000";
const MAX_NAME_LENGTH: number = 20;

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

const AddProfile = (props: AddProfileProps) => {
    const { email } = props.route.params;

    const [fontsLoaded] = useFonts({
        Inter: require('../assets/fonts/Inter-Regular.otf'),
        InterBold: require('../assets/fonts/Inter-Bold.otf')
    });

    const [name, setName] = useState("");
    const [college, setCollege] = useState<College | undefined>();
    const [year, setYear] = useState(0);
    const [photo, setPhoto] = useState<string | undefined>();
    const [nameError, setNameError] = useState(false);
    const [collegeError, setCollegeError] = useState(false);
    const [yearError, setYearError] = useState(false);

    const registerSuccess = (res) => {
        console.log("Successfully registered");
    }

    const registerFailure = (err) => {
        console.log(`Error: ${err}`);
    }

    const register = () => {
        // TODO: real error handling
        let error = false;
        setNameError(false);
        setCollegeError(false);
        setYearError(false);
        if (name.length == 0) {
            setNameError(true);
            error = true;
        }
        if (college == undefined) {
            setCollegeError(true);
            error = true;
        }
        if (year == 0) {
            setYearError(true);
            error = true;
        }
        if (!error) {
            // console.log(`'${name}' (${props.email}) at ${college} with year ${year}`);
            fetch(`${server}/api/profiles/addProfile`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'college': college,
                    'year': year,
                    'photo': "" // TODO: photo handling
                })
            })
            .then(registerSuccess)
            .catch(registerFailure);
        }
    };

    const displayError = (show: boolean) => {
        if (show) {
            return (<Text style={styles.error}>This field is required.</Text>);
        }
        return (<></>);
    };

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            {/* TODO: add picture adder */}
            <View>
                <Text style={[Styles.darkColor, styles.largeText]}>Welcome, {props.route.params.email}</Text>
                <View style={styles.nameContainer}>
                    <TextInput placeholder="Name" placeholderTextColor="grey" maxLength={MAX_NAME_LENGTH}
                        style={[Styles.darkColor, styles.largeText, styles.name]}
                        onChangeText={text => {
                            setName(text);
                            if (text.length > 0)
                                setNameError(false);
                            else
                                setNameError(true);
                        }}></TextInput>
                    <Octicons name="pencil" size={20} color="grey" style={{paddingBottom: 5}}/>
                </View>
                {displayError(nameError)}
            </View>
            <View>
                <View style={styles.row}>
                    <Dropdown placeholder="College" data={collegeData} labelField="item" valueField="item" onChange={obj => {
                        setCollege(obj.item);
                        setCollegeError(false)
                    }} />
                </View>
                {displayError(collegeError)}
            </View>
            <View>
                <View style={styles.row}>
                    <Dropdown placeholder="Year" data={yearData} labelField="label" valueField="value" onChange={obj => {
                        setYear(obj.value);
                        setYearError(false)
                    }} />
                </View>
                {displayError(yearError)}
            </View>
            <Button title="Next" onPress={register}/>
        </View>
    );
}

export default AddProfile;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        marginLeft: 10,
    },
    row: {
        flexDirection: "row"
    },
    error: {

    },
    largeText: {
        fontFamily: "Inter",
        fontSize: 40,
        fontWeight: "bold",
    },
    name: {
        textDecorationLine: "underline",
        width: "10%",
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        columnGap: 10,
    }
});