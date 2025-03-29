"use client"
import { LoginUser } from "@/actions/users/UserActions"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"

interface LoginFormValues {
    email: string
    password: string
}

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginFormValues>()

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        const result = await LoginUser({ ...data })
        if (result.success) {
            console.log("working")
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <label className="fieldset-label">Email</label>
                        <input type="email" className="input" placeholder="Email"
                            {...register("email", { required: "Email is Required" })}
                        />
                        {errors.email && (
                            <span className="text-error text-xs mt-1">
                                {errors.email.message}
                            </span>
                        )}
                        <label className="fieldset-label">Password</label>
                        <input type="password" className="input" placeholder="Password"
                            {...register("password", { required: "Psassword is Required" })}
                        />
                        {errors.password && (
                            <span className="text-error text-xs mt-1">
                                {errors.password.message}
                            </span>
                        )}
                        <div className="flex justify-between">
                            <a className="link link-hover">Forgot password?</a>
                            <div>Or, <Link href='/register'>Create an Account.</Link></div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login