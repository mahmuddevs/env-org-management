import EventsTableBody from "./EventsTableBody"

// export interface Event {
//     _id: string,
//     name: string,
//     description: string,
//     eventType: "Awareness Campaign" | "Clean-up Drive" | "Webinar",
//     date: Date,
//     location: string,
//     maxVolunteer: number,
//     deadline: Date,
//     bannerImage: string,
// }

const EventsTable = async () => {

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg border">
            <table className="table w-full">
                <thead className="bg-green-100 text-green-800 font-semibold text-sm">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Max Volunteers</th>
                        <th>Deadline</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <EventsTableBody />
            </table>
        </div>
    )
}

export default EventsTable
