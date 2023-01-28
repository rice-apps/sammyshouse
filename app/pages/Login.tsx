import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
    SignInParams,
    User,
} from "@react-native-google-signin/google-signin";

export default function Login({ navigation }) {
    GoogleSignin.configure({
        iosClientId: '898951963333-pclbscskf53rj8vg5e4sqvsedguvo74l.apps.googleusercontent.com'
    });
    useEffect(() => {
        GoogleSignin.signInSilently().then((userInfo) => {
            setUserInfo(userInfo);
            setSigninInProgress(true);
        }).catch((error) => {
            console.log(error);
        });
        
    }, []);

    const [signinInProgress, setSigninInProgress] = useState(false);
    // const [email, setEmail] = useState("Not signed in");
    const [userInfo, setUserInfo] = useState<User>(null);

    const signIn = async () => {
        setSigninInProgress(true);

        try {
            // Sign into Google
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (!userInfo.user.email.includes("@rice.edu")) {
                alert("You must use your @rice.edu email to sign in.");
                GoogleSignin.signOut();
                setSigninInProgress(false);
            } else {
                setUserInfo(userInfo);
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }

    const signOut = async () => {
        GoogleSignin.signOut();
        GoogleSignin.clearCachedAccessToken(userInfo.idToken);

        setSigninInProgress(false);
        setUserInfo(null);

    }

    // Try to sign in the user in case they've already signed in
    // GoogleSignin.signInSilently().then((userInfo) => {
    //     setUserInfo(userInfo);
    //     setSigninInProgress(true);
    // });

    return (
        <View style={styles.container}>
            <Text>{userInfo ? userInfo.user.email : ""}</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={signinInProgress}
            />
            <Button title="sign out" onPress={signOut}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
