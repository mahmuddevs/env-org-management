

const EventDetails = async ({ params }: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params

    console.log(id)

    return (
        <div>EventDetails</div>
    )
}

export default EventDetails
