import { getUserPerMonth } from "@/actions/users/UserActions"
import TotalDonations from "@/app/(dashboard)/components/admin/TotalDonations"
import TotalVolunteers from "@/app/(dashboard)/components/admin/TotalVolunteers"
import UpcomingEvents from "@/app/(dashboard)/components/admin/UpcomingEvents"
import UsersPerMonth from "@/app/(dashboard)/components/admin/UsersPerMonth"

const Admin = async () => {
  const { userPerMonth } = await getUserPerMonth()
  return (
    <section>
      <div className="grid md:grid-cols-3 gap-4 mx-4 my-6">
        <TotalDonations />
        <TotalVolunteers />
        <UpcomingEvents />
      </div>
      <UsersPerMonth data={userPerMonth} />
    </section>
  )
}
export default Admin
