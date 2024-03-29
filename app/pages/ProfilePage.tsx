import React, { Component, FC, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  Divider, Flex, Box, Avatar, HStack, ScrollView, VStack, Center, Heading, NativeBaseProvider} from "native-base";

// Add the header. 

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <HStack justifyContent="center" space={2}>
      <Avatar 
          bg="green.500" 
          source={{uri: "https://picsum.photos/700"}}>
      </Avatar>
      </HStack>
      <Text style={styles.text}> NAME </Text>
      <Text variant="bodyMedium"> BIO </Text>
      <Box alignItems="center">
            <Flex mx="3" direction="row" justify="space-evenly" h="30">
                <Heading py="3" fontSize="s">    Friends          </Heading>
                <Divider orientation="vertical" mx="5" _light={{
                bg: "muted.800"}} _dark={{
                bg: "muted.50"}} />
                <Heading py="3"  fontSize="s" >Organizations  </Heading>
            </Flex>
        </Box>
        <ScrollView w={["300", "300"]} h="80">
          <Center mt="3" mb="4">
            <Heading fontSize="xl">Liked Events</Heading>
          </Center>
          <VStack space={4}>
            <Center w="80" h="20" bg="indigo.300" rounded="md" shadow={3} text ="placeholder"/>
            <Center w="80" h="20" bg="indigo.500" rounded="md" shadow={3} />
            <Center w="80" h="20" bg="indigo.700" rounded="md" shadow={3} />
            <Center w="80" h="20" bg="indigo.300" rounded="md" shadow={3} />
            <Center w="80" h="20" bg="indigo.300" rounded="md" shadow={3} />
          </VStack>
          </ScrollView>
      </View>
      );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <ProfilePage />
      </Center>
    </NativeBaseProvider>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
});
    