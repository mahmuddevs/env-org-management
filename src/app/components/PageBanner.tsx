interface PageBannerProps {
    image: string,
    heading: string,
    subHeading: string
}

const PageBanner = ({ image, heading, subHeading }: PageBannerProps) => {
    return (
        <section
            style={{
                backgroundImage: `url(${image})`,
            }}
            className="text-white py-20 px-4 text-center bg-cover bg-center bg-no-repeat"
        >
            <h1 className="text-4xl font-bold mb-4">{heading}</h1>
            <p className="text-lg">{subHeading}</p>
        </section>
    )
}
export default PageBanner