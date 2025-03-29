"use client";
import { registerUser } from "@/actions/users/UserActions";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

export enum UserType {
    ADMIN = "Admin",
    VOLUNTEER = "Volunteer",
    DONOR = "Donors",
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    userType?: UserType;
    image?: string;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const result = await registerUser({ ...data });
        console.log(result);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)} className="fieldset">
                        <label className="fieldset-label">Name</label>
                        <input type="text" className="input" placeholder="Name"
                            {...register("name", { required: "Name is Required" })}
                        />
                        {errors.name && (
                            <span className="text-error text-xs mt-1">
                                {errors.name.message}
                            </span>
                        )}
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
                            {...register("password", {
                                required: "Password is Required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                                    message: "Password must have at least 1 uppercase letter and 1 special character",
                                },
                            })}
                        />
                        {errors.password && (
                            <span className="text-error text-xs mt-1">
                                {errors.password.message}
                            </span>
                        )}
                        <label className="fieldset-label">Account Type</label>
                        <select defaultValue="" className="select"
                            {...register("userType", { required: "Type is Required" })}>
                            <option value="" disabled>Select A Type</option>
                            <option value={UserType.VOLUNTEER}>Volunteer</option>
                            <option value={UserType.DONOR}>Donor</option>
                        </select>
                        {errors.userType && (
                            <span className="text-error text-xs mt-1">
                                {errors.userType.message}
                            </span>
                        )}
                        <div className="flex justify-between">
                            <Link href="/login" className="link link-hover">Already Have an Account?</Link>
                            <Link href="/register">Login Here.</Link>
                        </div>
                        <button type="submit" className="btn btn-primary mt-4" disabled={isSubmitting}>
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
