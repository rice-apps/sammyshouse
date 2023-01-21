import { StyleSheet } from 'react-native';

const Theme = {
    darkBlue: "#26356A",
    mediumBlue: "#5C76B9",
    mainColor: function() {
        return this.mediumBlue;
    },
    darkMainColor: function() {
        return this.darkBlue;
    }
}

const Styles = StyleSheet.create({
    mainColor: {
        color: Theme.mainColor(),
    },
    darkMainColor: {
        color: Theme.darkMainColor(),
    }
});

export { Theme, Styles };