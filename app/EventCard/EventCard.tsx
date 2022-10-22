import React from 'react';
import EventData from './EventData';

const defaultImageURI: string = 'https://brand.rice.edu/sites/g/files/bxs2591/files/2019-08/190308_Rice_Mechanical_Brand_Standards_Logos-2.png';

const EventCard = (props: {
    data: EventData,
}) => {
    const month: string = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(props.data.dateTime);
    const weekday: string = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(props.data.dateTime).toUpperCase();
    const dayOfMonth: string = props.data.dateTime.getDate().toString();
    const time: string = props.data.dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (props.data.imageURI == undefined) {
        props.data.imageURI = defaultImageURI;
    }
};

export default EventCard;