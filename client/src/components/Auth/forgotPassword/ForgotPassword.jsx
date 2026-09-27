import { useState } from 'react';
import './forgotpassword.css';
import { useNavigate } from 'react-router-dom';
import { userValidation } from "../../../validation/userValidation";
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from "react-toastify";
import axiosinterceptor from "../../../services/axiosinterceptor";


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [showPassPage, setShowPassPage] = useState(false);
    const [user, setUser] = useState();


    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confrimPassword: ""
        }
    })
    const submitForm = async (data) => {
        try {
            const response = await axiosinterceptor.post('/user/getbyemail', {
                email: data.email
            });
            console.log(response.data);
            setUser(response.data);
            setShowPassPage(true);
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "User not found"
            );
        }
    }

    const resetPassword = async (data) => {
        console.log("USER:", user);
        console.log("USER ID:", user?._id);
        console.log("PASSWORD:", data.password);
        console.log("CONFIRM:", data.confirmPassword);
        if (!user?._id) {
            toast.error("User not Found!");
            setShowPassPage(false);
            return;
        }

        if (!data.password || !data.confirmPassword) {
            toast.error("Please enter password & confirm password.");
            return;
        }


        if (data.password !== data.confirmPassword) {
            toast.error("Password Doesn't match.")
            return;
        }

        try {
            const response = await axiosinterceptor.put(`/user/updatepassword/${user._id}`, {
                password: data.password,
                confirmPassword: data.confirmPassword
            });
            console.log("Update Successful", response);
            toast.success("Password Updated successful!");
            reset();
            setUser(null);
            setShowPassPage(false);

            navigate("/login");
        } catch (error) {
            console.log("Reset Password Error!", error);
            toast.error(
                error.response?.data?.message || "Unable to Update Password."
            );
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="container-fluid mt-4 forgot-pass-container p-5">
                <div className="container">
                    {!showPassPage ? (
                        <div>
                            <h2 className="text-center text-white fw-bold">
                                Forgot Password
                            </h2>
                            <form onSubmit={handleSubmit(submitForm)}>
                                <div className="mb-3 mt-5">
                                    <label className="form-label"> Enter Your Email</label>
                                    <input
                                        type="email" {...register("email", userValidation.email)}
                                        className="form-control"
                                        placeholder="Enter Email"
                                    />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                <div className="text-center mt-3">
                                    <button className="btn btn-danger">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>

                    ) : (
                        <div>
                            <h2 className="text-center text-danger fw-bold">
                                Reset Password
                            </h2>

                            <form onSubmit={handleSubmit(resetPassword)}>

                                <div className="mb-3 mt-5">
                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        {...register("confirmPassword")}
                                        className="form-control"
                                        placeholder="Confirm Password"
                                    />
                                </div>

                                <div className="text-center mt-3">
                                    <button type="button" className="btn btn-info text-white" onClick={() => {
                                        setShowPassPage(false);
                                    }}>
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-danger ms-4"
                                    >
                                        Reset Password
                                    </button>
                                </div>

                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ForgotPassword