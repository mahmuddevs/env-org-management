import Achievements from "./achievements"
import Hero from "./hero"
import OurMission from "./our-mission"
import UpcomingEvents from "./upcoming-events"

const Home = () => {
    return (
        <>
            <Hero />
            <Achievements />
            <UpcomingEvents />
            <OurMission />
        </>
    )
}
export default Home