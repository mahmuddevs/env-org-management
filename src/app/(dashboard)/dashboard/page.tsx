"use client"
import Spinner from "@/app/components/Spinner"
import { useAppSelector } from "@/lib/hooks"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Dashboard = () => {
    const { user } = useAppSelector(state => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push('/login')
        } else if (user) {
            const { userType } = user as { userType: string }
            if (userType === "admin") {
                router.push('/dashboard/admin')
            } else if (userType === "volunteer") {
                router.push('/dashboard/volunteer')
            } else if (userType === "donor") {
                router.push('/dashboard/donor')
            }
        }
    }, [user, router])

    if (user === null) {
        return <Spinner small={null} />
    }

    return null
}

export default Dashboard
