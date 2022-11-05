import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";

const AddEvent = () => {
  const [text, onChangeText] = React.useState(null);

  return (
    <SafeAreaView>

      <TextInput
        style={styles.singleline}
        onChangeText={onChangeText}
        value={text}
        placeholder="Name"
      />
      
      <TextInput
        style={styles.singleline}
        onChangeText={onChangeText}
        value={text}
        placeholder="Location"
        keyboardType="numeric"
      />

      <TextInput
        multiline
        style={styles.multiline}
        numberOfLines={4}
        onChangeText={onChangeText}
        value={text}
        placeholder="Description"
      />

      <TextInput
        style={styles.singleline}
        onChangeText={onChangeText}
        value={text}
        placeholder="Price"
        keyboardType="numeric"
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  singleline: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  multiline: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

});

export default AddEvent;