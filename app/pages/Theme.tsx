import { StyleSheet } from 'react-native';

const Theme = {
    grey: "#BDC0C9",
    darkGrey: "#82899C",
    darkBlue: "#26356A",
    mediumBlue: "#5C76B9",
    mainColor: function() {
        return this.mediumBlue;
    },
    darkColor: function() {
        return this.darkBlue;
    },
    greyColor: function() {
        return this.grey;
    },
    darkGreyColor: function() {
        return this.darkGrey;
    }
}

const Styles = StyleSheet.create({
    mainColor: {
        color: Theme.mainColor(),
    },
    darkColor: {
        color: Theme.darkColor(),
    },
    greyColor: {
        color: Theme.greyColor(),
    },
    darkGreyColor: {
        color: Theme.darkGreyColor(),
    }
});

export { Theme, Styles };