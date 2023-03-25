import { useFonts } from 'expo-font';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import IEventCardData from '../../types/IEventCardData';
import IEvent, { IEventIntermediate } from '../../types/IEvent';

const defaultImageURI: string = 'https://brand.rice.edu/sites/g/files/bxs2591/files/2019-08/190308_Rice_Mechanical_Brand_Standards_Logos-2.png';
const defaultLocation: string = 'Unknown';

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        /*
         * TODO: volatile! Fix these to appropriate dimensions.
         * They were originally relative, as we thought that the cards
         * would just be immediate children of a view that took up the
         * entire screen, but they turn out to be children of a FlatList
         * or ScrollView that doesn't take up the whole screen, so they
         * can't be relative. These were calculated based on the web
         * renderer I was viewing the pages in, so they're perhaps not
         * actually good values.
         */
        width: 338, // '90%',
        height: 133, // '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inner: {
        width: "90%",
        height: "90%",
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    leftSide: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '50%'
    },
    info: {
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1
    },
    dateInfo: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    big: {
        fontSize: 18,
    },
    bold: {
        fontFamily: 'InterBold'
    },
    inter: {
        fontFamily: 'Inter'
    },
    iconGroup: {
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    marginRight: {
        marginRight: '10%'
    },
    row: {
        flexDirection: 'row'
    },
    rightSide: {
        flexDirection: 'column',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        height: '72%'
    }
});

const HappeningTodayEvent = (props: {
  data: IEventCardData,
  onPress?: (_id: string) => void,
  onLike?: (_id: string, liked: boolean) => void
}) => {
  const [fontsLoaded] = useFonts({
      Inter: require('../../assets/fonts/Inter-Regular.otf'),
      InterBold: require('../../assets/fonts/Inter-Bold.otf')
  });
  const [liked, setLiked] = useState(false);

  if (!fontsLoaded) {
      return null;
  }

  const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(props.data.dateTime);
  const weekday: string = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(props.data.dateTime).toUpperCase();
  const dayOfMonth: string = props.data.dateTime.getDate().toString();
  const time: string = props.data.dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
  });

  let location = (props.data.location !== undefined ? props.data.location : defaultLocation);

  let mainImage = (props.data.imageURI == undefined ? 
      (<View style={[styles.mainImage, {backgroundColor: '#d9d9d9', borderRadius: 5}]}></View>)
  : (<Image source={{ uri: props.data.imageURI }} style={[styles.mainImage, {resizeMode: 'center'}]} />));

  let likeIcon = (liked ?
                      (<AntDesign name="heart" size={20} color="black" style={{textAlign: 'right'}}/>) :
                      (<AntDesign name="hearto" size={20} color="black" style={{textAlign: 'right'}}/>));

  return (
      <TouchableOpacity style={styles.card} onPress={() => props.onPress(props.data.eventId)}>
          <View style={styles.inner}>
              <View style={styles.leftSide}>
                  {mainImage}
                  <View style={styles.info}>
                      <View style={{width: '100%', height: '40%', justifyContent: 'space-between'}}>
                          <Text style={[styles.bold, styles.big]}>{props.data.eventName}</Text>
                          <View style={styles.row}>
                              <Text style={styles.inter}>by </Text>
                              <Text style={styles.bold}>{props.data.postedBy}</Text>
                          </View>
                      </View>
                      <View style={{width:'100%', height: '35%', justifyContent: 'space-between'}}>
                          <View style={styles.iconGroup}>
                              <FontAwesome5 name="clock" size={15} color="black" style={styles.marginRight}/>
                              <Text style={styles.inter}>{time}</Text>
                          </View>
                          <View style={styles.iconGroup}>
                              <Ionicons name="location-sharp" size={15} color="black" style={styles.marginRight}/>
                              <Text numberOfLines={1} style={styles.inter}>{location}</Text>
                          </View>
                      </View>
                  </View>
              </View>
              <View style={styles.rightSide}>
                  <View style={styles.dateInfo}>
                      <View style={{alignItems: 'flex-end'}}>
                          <Text style={styles.bold}>{weekday}</Text>
                          <Text style={styles.inter}>{month}</Text>
                          <Text style={[styles.inter, styles.big]}>{dayOfMonth}</Text>
                      </View>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                      if (props.onLike !== undefined) {
                          props.onLike(props.data.eventId, !liked);
                      }
                      setLiked(!liked);
                  }}>
                      {likeIcon}
                  </TouchableWithoutFeedback>
              </View>
          </View>
      </TouchableOpacity>
  );
};

const happeningTodayEventFromData = (event: IEvent,
                        onPress?: (_id: string) => void, onLike?: (_id: string, liked: boolean) => void) => {
  const eventData: IEventCardData = {
      eventId: event._id,
      eventName: event.name,
      postedBy: "TODO",
      dateTime: event.date,
      location: event.location,
      imageURI: event.photo
  };
  return <HappeningTodayEvent data={eventData} key={event._id} onPress={onPress} onLike={onLike}/>
};

export default HappeningTodayEvent;
export { happeningTodayEventFromData };
