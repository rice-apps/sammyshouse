import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Text, Card, Button} from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

// need to add functionality to commands, just placeholders for now. 

export default function EventPage() {

  const [text, setText] = React.useState("");
  const _goBack = () => console.log('Went back');
  const _handleMore = () => console.log('Shown more');

  return (
    <PaperProvider>
      <Card>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>
      <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Hosted by xxxx"/>
      <Text variant="titleSmall" > freeeee </Text>
      <Appbar.Action icon="heart" onPress={_handleMore} />
      </Appbar.Header>
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.eventName}>EVENT NAME</Text>
      <Button icon="calendar-blank-outline" mode="text">
      Day, Date, at Time
      </Button> 
      <Button icon="map-marker" mode="text">
      Location
      </Button>
      <Text variant="bodyMedium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptas itaque eligendi sint vero deleniti repudiandae, nisi tempora non quo nesciunt dolor placeat saepe natus laboriosam quis expedita nostrum. Harum? </Text>
    </View>
    <View style={styles.container}>
      <Text variant="displayMedium" style={styles.eventName}>Tags</Text>
      <Avatar.Text size={30} label="Tag" />
    </View>
    
    </PaperProvider>
  );
}

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