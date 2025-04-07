import { getAllUsers } from "@/actions/users/UserActions"
import UsersTableBody from "./UsersTableBody";

export interface User {
    _id: string;
    image: string;
    name: string;
    email: string;
    userType: string;
}

const UsersTable = async () => {
    const { users }: { users: User[] } = await getAllUsers()
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className="hidden md:table-cell">Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <UsersTableBody users={users} />
            </table>
        </div>
    )
}
export default UsersTable