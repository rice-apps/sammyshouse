import { Theme } from '../pages/Theme';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// Assumes that the Inter font has already been loaded.
const ThemedButton = (props: {
    text: string,
    pressed: boolean,
    onPress?: () => void,
    onPressIn?: () => void,
    onPressOut?: () => void,
}) => {
    const doNothing = (_) => {};
    const onPress = props.onPress != undefined ? (_) => {props.onPress()} : doNothing;
    const onPressIn = props.onPressIn != undefined ? (_) => {props.onPressIn()} : doNothing;
    const onPressOut = props.onPressOut != undefined ? (_) => {props.onPressOut()} : doNothing;

    return (
        <Pressable style={[styles.button, {
            backgroundColor: (props.pressed ? Theme.greyColor() : Theme.mainColor())
        }]} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
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
    }
});

export default ThemedButton;