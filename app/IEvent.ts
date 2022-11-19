interface IEvent {
    _id: string,
    name: string,
    photo?: string,
    location?: string,
    date: Date,
    description: string,
    tags: string[],
    price?: number,
    host?: string
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
    host?: string
}

export default IEvent;
export { IEventIntermediate };
