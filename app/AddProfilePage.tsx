import { useFonts } from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// TODO: figure out server address
const server: string = "http://localhost:3000";

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
            console.log("You must provide your name");
            setNameError(true);
            error = true;
        }
        if (college == undefined) {
            console.log("You must select a college");
            setCollegeError(true);
            error = true;
        }
        if (year == 0) {
            console.log("You must select your graduation year");
            setYearError(true);
            error = true;
        }
        if (!error) {
            console.log(`'${name}' (${props.email}) at ${college} with year ${year}`);
            /*fetch(`${server}/api/profiles/addProfile`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'name': name,
                    'email': props.email,
                    'college': college,
                    'year': year,
                    'photo': "" // TODO: photo handling
                })
            })
            .then(registerSuccess)
            .catch(registerFailure);*/
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
                <View style={styles.row}>
                    <FontAwesome5 name="star" size={15} color="black" />
                    <TextInput placeholder="Name" placeholderTextColor="grey" style={styles.outline}
                        onChangeText={text => {
                            setName(text);
                            if (text.length > 0)
                                setNameError(false);
                            else
                                setNameError(true);
                        }}></TextInput>
                </View>
                {displayError(nameError)}
            </View>
            <View>
                <View style={styles.row}>
                    <FontAwesome5 name="university" size={15} color="black" />
                    <Dropdown placeholder="College" data={collegeData} labelField="item" valueField="item" onChange={obj => {
                        setCollege(obj.item);
                        setCollegeError(false)
                    }} />
                </View>
                {displayError(collegeError)}
            </View>
            <View>
                <View style={styles.row}>
                    <FontAwesome5 name="calendar-alt" size={15} color="black" />
                    <Dropdown placeholder="Graduation Year" data={yearData} labelField="label" valueField="value" onChange={obj => {
                        setYear(obj.value);
                        setYearError(false)
                    }} />
                </View>
                {displayError(yearError)}
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
    },
    error: {

    }
});