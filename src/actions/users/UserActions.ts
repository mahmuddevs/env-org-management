"use server"
import { RegisterFormValues } from "@/app/(auth)/register/page";
import User from "@/db/UserSchema";
import dbConnect from "@/lib/dbConnect";
import generateToken, { DecodedToken, verifyToken } from "@/lib/jwt/JWT";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

interface LoginCredentials {
    email: string,
    password: string
}

export const registerUser = async ({ name, email, password, userType, image }: RegisterFormValues) => {
    if (!name || !email || !password || !userType) {
        return { success: false, user: null, error: "All fields are required!" };
    }

    try {
        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, user: null, error: "User Exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, userType, image });


        if (!newUser) {
            return { success: false, user: null }
        }

        const token = generateToken(newUser.email, userType)

        const cookieStore = await cookies();

        cookieStore.set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        const safeUser = JSON.parse(JSON.stringify(newUser));

        return {
            success: true,
            user: { ...safeUser, password: null }
        };
    } catch (error: any) {
        console.error("Error Adding User:", error.message);
        return { error: error.message };
    }
};


export const LoginUser = async ({ email, password }: LoginCredentials) => {
    try {
        await dbConnect();
        const user = await User.findOne({ email })
        if (!user) {
            return { success: false, user: null, error: "User not found" };
        }
        const isPassMatched = await bcrypt.compare(password, user.password)

        if (!isPassMatched) {
            return { success: false, user: null, error: "Invalid credentials" };
        }

        const token = generateToken(email, user?.userType || "Volunteer")

        const cookieStore = await cookies();

        cookieStore.set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        const safeUser = JSON.parse(JSON.stringify(user));

        return { success: true, user: { ...safeUser, password: null } }

    } catch (error: any) {
        console.error("Error Loggin In:", error.message);
        return { error: error.message };
    }
}

export const getAuthenticatedUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value

    const decoded = verifyToken(token) as { email: string, userType: string }

    const email = decoded?.email

    await dbConnect()

    const user = await User.findOne({ email })

    if (!user) {
        return { success: false, user: null }
    }

    const safeUser = JSON.parse(JSON.stringify(user));

    return { success: true, user: { ...safeUser, password: null } }

}

export const logoutUser = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('authToken')

    return { success: true }
}

export const getAllUsers = async () => {
    await dbConnect()
    const allUsers = await User.find({}).select('-password')

    if (!allUsers) {
        return { success: false, users: null }
    }

    const safeUsers = JSON.parse(JSON.stringify(allUsers));
    return { success: true, users: safeUsers }
}

export const deleteUser = async (id: string) => {
    if (!id) {
        return { success: false, message: "Unable To Delete User" }
    }

    await dbConnect()

    const { userType } = await User.findById(id).select('userType') as { userType: string }

    if (userType === 'admin') {
        return { success: false, message: "Can't Delete Admin Account" }
    }

    const result = await User.findByIdAndDelete(id)

    if (!result) {
        return { success: false, message: "Unable To Delete User" }
    }

    return { success: true, message: "Successfully Deleted User" }
}

export const handleUpdateUserType = async (id: string, userType: string) => {
    if (!id || !userType) {
        return { success: false, message: "Invalid Selection" }
    }

    await dbConnect()

    const updatedUser = await User.findByIdAndUpdate(id, { userType }, { new: true, select: '-password' })

    if (!updatedUser) {
        return { success: false, message: "Unable To Update User Type" }
    }

    return { success: true, message: "User Updated Successfully" }
}