import React, { Component, FC, useState } from 'react';
import {  Divider, Flex, Box, Avatar, ScrollView, VStack, Center, useTheme, Heading, NativeBaseProvider } from "native-base";
import { Provider as PaperProvider } from 'react-native-paper';

// notes: style the avatar to the left, implement functionality to event list. 

export default function ProfilePage() {

    return (
        <PaperProvider>
          <Avatar bg="green.500" source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}}>
          </Avatar>
          <Box alignItems="center">
            <Flex mx="3" direction="row" justify="space-evenly" h="60">
                <Heading py="2">Friends</Heading>
                <Divider orientation="vertical" mx="3" _light={{
                bg: "muted.800"}} _dark={{
                bg: "muted.50"}} />
                <Heading py="2">Organizations</Heading>
            </Flex>
          </Box>
          <ScrollView w={["200", "300"]} h="80">
          <Center mt="3" mb="4">
            <Heading fontSize="xl">Liked Events</Heading>
          </Center>
          <VStack space={4} alignItems="center">
            <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} text ="placeholder"/>
            <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.300" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.500" rounded="md" shadow={3} />
            <Center w="64" h="20" bg="indigo.700" rounded="md" shadow={3} />
          </VStack>
          </ScrollView>
        </PaperProvider>);
    };