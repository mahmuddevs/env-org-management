import PageBanner from "@/app/components/PageBanner"
import JoinOurMission from "./join-our-mission"
import OurStory from "./story"
import OurTeam from "./team"
import aboutBanner from '../../../../public/assets/images/about-banner.jpg'

const About = () => {
    return (
        <>
            <PageBanner
                image={aboutBanner}
                heading="About Us"
                paragraph="We work to restore balance between people and planet through action and awareness."
            />
            <OurTeam />
            <OurStory />
            <JoinOurMission />
        </>
    )
}
export default About