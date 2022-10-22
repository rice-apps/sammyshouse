interface EventData {
    eventName: string,
    postedBy: string,
    location: string,
    dateTime: Date,
    imageURI?: string
}

export default EventData;