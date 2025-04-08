interface EventPageProps {
    params: {
        id: string;
    };
}

const EventDetails = async ({ params }: EventPageProps) => {
    const { id } = params

    return (
        <div>EventDetails</div>
    )
}

export default EventDetails
