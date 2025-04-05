import Link from "next/link"
import EventCard from "../components/EventCard"
import SectionTitle from "../components/SectionTitle"

const UpcomingEvents = () => {
    return (
        <section className="global-container global-margin">
            <SectionTitle
                heading="Upcoming Events"
                paragraph="Be part of our mission for a greener future. Discover events where you can volunteer, learn, and make an impact."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <EventCard
                    _id="alskjd"
                    image="/images/tree-planting.jpg"
                    name="Tree Planting Drive"
                    date="April 20, 2025"
                    location="Central Park, NY" />
                <EventCard
                    _id="alskjd"
                    image="/images/tree-planting.jpg"
                    name="Tree Planting Drive"
                    date="April 20, 2025"
                    location="Central Park, NY" />
                <EventCard
                    _id="alskjd"
                    image="/images/tree-planting.jpg"
                    name="Tree Planting Drive"
                    date="April 20, 2025"
                    location="Central Park, NY" />
            </div>
            <div className="flex justify-center my-8">
                <Link href='/events' className="btn btn-success text-white">View All Events</Link>
            </div>
        </section>
    )
}
export default UpcomingEvents