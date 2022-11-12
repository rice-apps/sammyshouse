interface IEvent {
    _id: string,
    name: string,
    photo?: string,
    location?: string,
    date: Date,
    description: string,
    tags: string[],
    price?: number
};

interface IEventIntermediate {
    _id: string,
    name: string,
    photo?: string,
    location?: string,
    date: string,
    description: string,
    tags: string[],
    price?: number
}

export default IEvent;
export { IEventIntermediate };
