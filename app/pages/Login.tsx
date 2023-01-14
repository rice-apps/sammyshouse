import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

export default function Login() {
    GoogleSignin.configure({
        iosClientId: '898951963333-pclbscskf53rj8vg5e4sqvsedguvo74l.apps.googleusercontent.com'
    });
    
    const [signinInProgress, setSigninInProgress] = useState(false);
    const signIn = async () => {
        setSigninInProgress(true);
        try {
            // Sign into Google
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
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

    return (
        <View style={styles.container}>
            <Text>Hi</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={signinInProgress}
                />
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
