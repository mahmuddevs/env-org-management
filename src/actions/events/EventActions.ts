"use server"

import Event, { IEvent } from "@/db/EventSchema"
import dbConnect from "@/lib/dbConnect"

export const getAllEvents = async () => {
    await dbConnect()

    const events = await Event.find({})

    if (!events) {
        return { success: false, message: "No Events Found" }
    }

    const safeEvents = JSON.parse(JSON.stringify(events))

    return { success: true, events: safeEvents }

}   