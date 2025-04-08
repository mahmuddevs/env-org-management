"use client"

import { FaEdit, FaTrash } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { fetchEvents, removeFromEventState } from "@/lib/features/eventSlice/eventSlice"
import { useEffect } from "react"
import { deleteEvent } from "@/actions/events/EventActions"
import Swal from "sweetalert2"

const EventsTableBody = () => {
    const dispatch = useAppDispatch();
    const { events } = useAppSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })

        if (result.isConfirmed) {
            const { success, message, deletedEvent } = await deleteEvent(id)

            if (!success) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                return
            }

            Swal.fire({
                title: "Deleted!",
                text: `${message}`,
                icon: "success"
            });
            dispatch(removeFromEventState(deletedEvent._id))
        }
    }

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
                        <td className="flex items-center gap-3 text-2xl">
                            <FaEdit className="text-blue-500 cursor-pointer" title="Edit" />
                            <FaTrash onClick={() => { handleDelete(event._id) }}
                                className="text-red-500 cursor-pointer" title="Delete" />
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