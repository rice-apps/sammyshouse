import { useFonts } from 'expo-font';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Text, TextInput } from 'react-native';
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
    const [nextPressed, setNextPressed] = useState(false);

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

    const dropdownIcon = (_?: boolean) => {
        return (<MaterialIcons name="keyboard-arrow-down" size={24} color={Theme.mainColor()} style={styles.dropdownIcon}/>);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[Styles.darkColor, styles.largeText]}>Welcome,</Text>
                <View style={styles.nameContainer}>
                    <TextInput placeholder="Name" placeholderTextColor={Theme.darkGreyColor()} maxLength={MAX_NAME_LENGTH}
                        style={[Styles.darkColor, styles.largeText, styles.name]}
                        onChangeText={text => {
                            setName(text);
                            if (text.length > 0)
                                setNameError(false);
                            else
                                setNameError(true);
                        }}></TextInput>
                    <Octicons name="pencil" size={20} color="grey" style={{paddingBottom: 5, flexGrow: 0}}/>
                </View>
                {displayError(nameError)}
            </View>
            <View style={styles.fillWidth}>
                <View style={styles.cameraCircle}>
                    <MaterialIcons name="photo-camera" size={74} color={Theme.darkColor()} />
                </View>
                <Text style={styles.profilePicText}>Add profile picture</Text>
            </View>
            <View style={styles.fillWidth}>
                <Dropdown placeholder="College" data={collegeData} labelField="item" valueField="item" onChange={obj => {
                    setCollege(obj.item);
                    setCollegeError(false)
                }} fontFamily="Inter" selectedTextStyle={[styles.dropdownItem, styles.dropdownSelected]}
                itemTextStyle={styles.dropdownItem} placeholderStyle={[styles.dropdownItem, styles.dropdownSelected]}
                renderRightIcon={dropdownIcon} style={[styles.dropdown, {marginBottom: 15}]} />
                {displayError(collegeError)}
                <Dropdown placeholder="Year" data={yearData} labelField="label" valueField="value" onChange={obj => {
                    setYear(obj.value);
                    setYearError(false)
                }} fontFamily="Inter" selectedTextStyle={[styles.dropdownItem, styles.dropdownSelected]}
                itemTextStyle={styles.dropdownItem} placeholderStyle={[styles.dropdownItem, styles.dropdownSelected]}
                renderRightIcon={dropdownIcon} style={styles.dropdown}/>
                {displayError(yearError)}
            </View>
            <View style={styles.bottom}>
                <View style={styles.progress}>
                    <View style={styles.firstSection}></View>
                    <View style={styles.middleSection}></View>
                    <View style={styles.lastSection}></View>
                </View>
                <Pressable style={[styles.button, {
                    backgroundColor: (nextPressed ? Theme.greyColor() : Theme.mainColor())
                }]} onPress={register} onPressIn={(_) => setNextPressed(true)} onPressOut={(_) => setNextPressed(false)}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default AddProfile;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-around",
        height: "100%",
        width: "100%",
        marginLeft: 10,
    },
    fillWidth: {
        width: "95%",
        alignItems: 'center'
    },
    error: {

    },
    largeText: {
        fontFamily: "Inter",
        fontSize: 34,
        fontWeight: "bold",
    },
    name: {
        textDecorationLine: "underline",
        width: "50%",
        flexGrow: 1,
    },
    nameContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        width: "90%",
        columnGap: 10,
    },
    header: {
        marginLeft: "10%",
        width: "90%",
    },
    cameraCircle: {
        width: 174,
        height: 174,
        borderRadius: 174/2,
        borderWidth: 2,
        borderColor: Theme.darkColor(),
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicText: {
        fontFamily: "Inter",
        fontSize: 14,
        color: Theme.darkColor(),
        paddingTop: 10,
    },
    dropdown: {
        width: "80%",
        borderWidth: 2,
        borderColor: Theme.greyColor(),
        borderRadius: 10,
        paddingVertical: 3,
    },
    dropdownItem: {
        color: Theme.darkGreyColor(),
        fontSize: 16,
        fontWeight: "400",
    },
    dropdownSelected: {
        marginLeft: "5%",
    },
    dropdownIcon: {
        paddingRight: "5%",
    },
    button: {
       borderRadius: 5,
       paddingLeft: '10%',
       paddingRight: '10%',
       paddingTop: '2.5%',
       paddingBottom: '2.5%',
    },
    buttonText: {
        fontFamily: "Inter",
        fontSize: 16,
        color: "#ffffff",
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: "5%",
        width: '90%',
    },
    progress: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstSection: {
        backgroundColor: Theme.mainColor(),
        height: 12,
        width: 50,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        marginRight: 3,
    },
    middleSection: {
        backgroundColor: Theme.greyColor(),
        height: 12,
        width: 50,
        marginRight: 3,
    },
    lastSection: {
        backgroundColor: Theme.greyColor(),
        height: 12,
        width: 50,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    }
});