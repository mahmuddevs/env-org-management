"use server"
import { RegisterFormValues } from "@/app/(auth)/register/page";
import User from "@/db/UserSchema";
import dbConnect from "@/lib/dbConnect";
import generateToken, { verifyToken } from "@/lib/jwt/JWT";
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

        const token = generateToken(newUser.email)

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

        const token = generateToken(email)

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

    const email = verifyToken(token)

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