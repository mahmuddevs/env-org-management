import { FC } from 'react';

interface EventPageProps {
    params: {
        id: string;
    };
}

const EventDetails: FC<EventPageProps> = ({ params }) => {
    const { id } = params;

    return (
        <div>Event Details for {id}</div>
    );
}

export default EventDetails;
