/* import React from 'react'; */
import React, { Component, FC, useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, TextInput } from "react-native";
import { SelectDropdown, Dropdown } from 'react-native-material-dropdown';

const AddEvent = () => {
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);

  const [selected, setSelected] = useState(undefined);
  const months = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ];

  const [visible, setVisible] = useState(false);
  const toggleDropdown = () => {
    setVisible(!visible);
  };
  const renderDropdown = () => {
    if (visible) {
      return (
          <Text style={styles.dropdown}>
            January
          </Text>
      );
    }
  };

  return (
    <SafeAreaView>
      {/* box for name */}
      <TextInput
        style={styles.singleline}
        onChangeText={onChangeText}
        value={text}
        placeholder="Name"
      />

      {/* dropdowns for month, day, year */}
      {/*
      <SelectDropdown
        data = {months}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
        }}
        rowTextForSelection={(item, index) => {
        }}
      />
      
      <TouchableOpacity
        style={styles.button}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>Month</Text>
      </TouchableOpacity>
      */}

      {/* return (<Picker />); */}
      
      {/* line for location */}
      <TextInput
        style={styles.singleline}
        onChangeText={onChangeText}
        value={text}
        placeholder="Location"
      />

      {/* bigger box for event description */}
      <TextInput
        multiline
        style={styles.multiline}
        numberOfLines={4}
        onChangeText={onChangeText}
        value={text}
        placeholder="Description"
      />

      {/* line for event price */}
      <TextInput
        style={styles.singleline}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Price"
        keyboardType="numeric"
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* styling for line inputs */
  singleline: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  multiline: {
    height: 160,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  /* styling for dropdown menu */
  button: {
    height: 40,
    width: 100,
    borderWidth: 1,
    padding: 10,
    margin: 12,
    borderRadius: 10,
  },

  buttonText: {
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
    width: '100%',
  },

});

export default AddEvent;