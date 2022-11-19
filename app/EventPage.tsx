import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, Card, Button} from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import EventCard, { eventCardFromData, parseEvent } from './EventCard/EventCard';
import IEventCardData from './EventCard/IEventCardData';
import IEvent, { IEventIntermediate } from './IEvent';

// need to add functionality to commands, just placeholders for now. 

// back end will be added

const defaultImageURI: string = 'https://picsum.photos/700';
const defaultDescription: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas itaque eligendi sint vero deleniti repudiandae, nisi tempora non quo nesciunt dolor placeat saepe natus laboriosam quis expedita nostrum. Harum?';
const defaultPrice: string = 'Free';
const defaultLocation: string = 'Unknown';

export default function EventPage() {

  const [text, setText] = React.useState("");
  const _goBack = () => console.log('Went back');
  const _handleMore = () => console.log('Shown more');
  const eventPage = (event: IEvent) => {

  let photo = (event.photo !== undefined ? event.photo : defaultImageURI);
  let description = (event.description !== undefined ? event.photo : defaultDescription);
  let price = (event.price !== undefined ? event.price : defaultPrice);
  let location = (event.location !== undefined ? event.location : defaultLocation);
  
  return (
    <PaperProvider>
      <Card>
        <Card.Cover source={{ uri: event.photo}} />
      </Card>
      <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title= {"Hosted by " + event.host}/>
      <Text variant="titleSmall" > {event.price} </Text>
      <Appbar.Action icon="heart" onPress={_handleMore} />
      </Appbar.Header>
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.eventName}>{event.name}</Text>
      <Button icon="calendar-blank-outline" mode="text">
      {event.date}
      </Button> 
      <Button icon="map-marker" mode="text">
      {event.location}
      </Button>
      <Text variant="bodyMedium">{event.description} </Text>
    </View>
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.eventName}>Tags</Text>
      <Avatar.Text size={30} label={"Tag" + event.tags }/>
    </View>
    
    </PaperProvider>
  );
}
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 30, 
  },

  eventName: {
    fontSize : 20,
    fontWeight: 'bold', 
  }
});

const textStyles = StyleSheet.create({
  input: {
    height: 30,
    margin: 12,
    borderWidth: 3,
    padding:10,
  },
});