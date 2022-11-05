interface IEventCardData {
    eventName: string,
    postedBy: string,
    dateTime: Date,
    location?: string,
    imageURI?: string
}

export default IEventCardData;