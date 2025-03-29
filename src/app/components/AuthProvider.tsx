"use client"

import { getAuthenticatedUser } from "@/actions/users/UserActions"
import { login, logout } from "@/lib/features/authSlice/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { ReactNode, useEffect } from "react"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const user = useAppSelector(state => state.auth.user)
    const dispatch = useAppDispatch()

    const getUser = async () => {
        const userData = await getAuthenticatedUser()
        if (!userData.success) {
            dispatch(logout())
        }
        dispatch(login(userData.user))
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <>{children}</>
    )
}
export default AuthProvider