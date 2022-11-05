interface IEvent {
    name: string,
    photo?: string,
    location?: string,
    date: Date,
    description: string,
    tags: [string],
    price?: number
};

export default IEvent;