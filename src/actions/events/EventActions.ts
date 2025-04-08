"use server"

import Event from "@/db/EventSchema"
import dbConnect from "@/lib/dbConnect"

interface EventFormData {
    name: string
    description: string
    eventType: "Awareness Campaign" | "Clean-up Drive" | "Webinar"
    date: string
    location: string
    maxVolunteer: number
    deadline: string
    bannerImage: FileList
}

export const getAllEvents = async () => {
    await dbConnect()

    const events = await Event.find({})

    if (!events) {
        return { success: false, message: "No Events Found" }
    }

    const safeEvents = JSON.parse(JSON.stringify(events))

    return { success: true, events: safeEvents }

}

export const getFeaturedEvents = async () => {
    await dbConnect()

    const events = await Event.find({}).sort({ createdAt: -1 }).limit(3)

    if (!events) {
        return { success: false, message: "No Events Found" }
    }

    const safeEvents = JSON.parse(JSON.stringify(events))

    return { success: true, events: safeEvents }
}


export const addEvent = async (data: EventFormData) => {
    if (!data) {
        return { success: false, message: "No Data Received" }
    }

    const file = data.bannerImage[0]

    if (!file) {
        return { success: false, message: "Image Not Found" }
    }

    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
    });

    const img = await res.json();

    if (!img) {
        return { success: false, message: "Image Upload Failed" }
    }

    const imageURL = img?.data?.image?.url

    const eventData = { ...data, bannerImage: imageURL }

    await dbConnect()

    const result = await Event.create(eventData)

    if (!result) {
        return { success: false, message: "Failed To Create Event" }
    }

    const safeEvent = JSON.parse(JSON.stringify(result));

    return { success: true, message: "Event Create Successfully", newEvent: safeEvent }
}


export const deleteEvent = async (id: string) => {
    if (!id) {
        return { success: false, message: "Event ID Not Valid" }
    }

    const result = await Event.findByIdAndDelete(id)

    if (!result) {
        return { success: false, message: "Unable To Delete Event" }
    }

    const safeDeletedEvent = JSON.parse(JSON.stringify(result))

    return { success: true, message: "Event Deleted Successfully", deletedEvent: safeDeletedEvent }
}



