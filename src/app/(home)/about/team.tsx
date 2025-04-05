import Image from "next/image"

const team = [
    {
        name: "Sarah Johnson",
        role: "Executive Director",
        bio: "With over 15 years of experience in environmental conservation, Sarah leads our organization with passion and vision.",
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        name: "Michael Chen",
        role: "Director of Operations",
        bio: "Michael oversees our day-to-day operations and ensures our programs run efficiently and effectively.",
        image: "/placeholder.svg?height=300&width=300",
    },
    {
        name: "Amara Okafor",
        role: "Community Outreach Manager",
        bio: "Amara builds and maintains relationships with communities, volunteers, and partner organizations.",
        image: "/placeholder.svg?height=300&width=300",
    },
]

const OurTeam = () => {
    return (
        <section className="py-16 bg-emerald-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Meet the dedicated professionals who guide our organization's mission and strategy.
                    </p>
                    <div className="w-24 h-1 bg-emerald-400 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                            <figure className="px-6 pt-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto">
                                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className="card-title text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-emerald-600 font-medium">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    )
}
export default OurTeam