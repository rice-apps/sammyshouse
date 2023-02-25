import { Theme } from '../pages/Theme';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ThreePageProgress = (props: {
    section: 0 | 1 | 2
}) => {
    return (
        <View style={styles.progress}>
            <View style={[styles.section, styles.firstSection, props.section >= 0 ? styles.active : styles.inactive]}></View>
            <View style={[styles.section, styles.middleSection, props.section >= 1 ? styles.active : styles.inactive]}></View>
            <View style={[styles.section, styles.lastSection, props.section >= 2 ? styles.active : styles.inactive]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    progress: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    active: {
        backgroundColor: Theme.mainColor(),
    },
    inactive: {
        backgroundColor: Theme.greyColor(),
    },
    section: {
        height: 12,
        width: 50,
    },
    firstSection: {
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        marginRight: 3,
    },
    middleSection: {
        marginRight: 3,
    },
    lastSection: {
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    }
});

export default ThreePageProgress;