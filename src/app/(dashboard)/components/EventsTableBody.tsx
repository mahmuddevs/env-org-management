"use client"

import { FaEdit, FaTrash } from "react-icons/fa"
import { Event } from "./EventsTable"

const EventsTableBody = ({ events }: { events: Event[] }) => {
    return (
        <tbody>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <tr key={event._id} className="hover">
                        <td>{index + 1}</td>
                        <td className="font-medium">{event.name}</td>
                        <td>{event.eventType}</td>
                        <td>{new Date(event.date).toLocaleDateString()}</td>
                        <td>{event.location}</td>
                        <td>{event.maxVolunteer}</td>
                        <td>{new Date(event.deadline).toLocaleDateString()}</td>
                        <td className="flex items-center gap-3">
                            <FaEdit className="text-blue-500 cursor-pointer" title="Edit" />
                            <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                        No events found.
                    </td>
                </tr>
            )}
        </tbody>
    )
}
export default EventsTableBody