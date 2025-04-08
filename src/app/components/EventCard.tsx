import Link from "next/link";
import { FaCalendarDay, FaMapPin } from "react-icons/fa6";
import { EventCardProps } from "../(home)/upcoming-events";
import Image from "next/image";


const EventCard = ({ _id, bannerImage, name, date, location }: EventCardProps) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition hover:shadow-xl">

            <Image
                src={bannerImage}
                alt={name}
                width={500}
                height={200}
                className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-3">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>

                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <FaCalendarDay className="w-4 h-4" />
                    <span>{date}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 gap-2">
                    <FaMapPin className="w-4 h-4" />
                    <span>{location}</span>
                </div>

                <Link href={`/events/${_id}`}
                    className="mt-3 inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                    Learn More
                </Link>
            </div>
        </div>
    )
}
export default EventCard