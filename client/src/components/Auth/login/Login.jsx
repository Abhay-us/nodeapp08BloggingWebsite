import { useForm } from 'react-hook-form'
import './login.css'
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { userValidation } from '../../../validation/userValidation';
import axiosinterceptor from '../../../services/axiosinterceptor';
import { IoIosLock } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';




const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const submitForm = async (data) => {
        try {
            const response = await axiosinterceptor.post('/user/login', {
                email: data.email,
                password: data.password
            });
            console.log(response.data);
            navigate("/", { replace: true })

        } catch (error) {
            console.log(" Login error", error);
        }

    }
    return (
        <>
            <div className="container-fluid  m-0 d-flex align-items-center login4-container">
                <div className="row d-flex justify-content-center w-100 p-5 m-0">
                    <div className="card p-0 border-0 rounded-4 overflow-hidden shadow-lg login4-card">
                        <div className="row g-0">
                            <div className="col-6 d-flex flex-column align-items-center text-center justify-content-center p-5 login4-overlay">
                                <h2 className="text-white fw-bold mb-3 login4-welcome-title">
                                    Welcome Back
                                </h2>
                                <p className="text-white-50 login4-welcome-text">
                                    To keep connected with us please login with your personal info
                                </p>
                            </div>
                            <div className="col-6 d-flex justify-content-center align-items-center p-4">
                                <form onSubmit={handleSubmit(submitForm)} className="login4-form">
                                    <h4 className="fw-bolder mb-4 text-center login4-form-title">
                                        Member Login
                                    </h4>
                                    <div className="d-flex gap-3 align-items-center bg-body-secondary rounded-pill py-2 px-4 login4-input-group">
                                        <span className="fs-5 d-flex align-items-center login4-icon">
                                            <MdEmail />
                                        </span>
                                        <input type="text"{...register("email", userValidation.email)} className="border-0 bg-transparent w-100 login4-input" placeholder="Email" />
                                        {errors.email && <p className='text-danger'>{errors.email.message}</p>}
                                    </div>
                                    <div className="d-flex mt-3 gap-3 align-items-center bg-body-secondary rounded-pill py-2 px-4 login4-input-group">
                                        <span className="fs-5 d-flex align-items-center login4-icon">
                                            <IoIosLock />
                                        </span>
                                        <input type="password"{...register("password", userValidation.password)} className="border-0 bg-transparent w-100 login4-input" placeholder="Password" />
                                        {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                                    </div>
                                    <div className="d-flex justify-content-between mt-3 login4-options">
                                        <label className="d-flex align-items-center login4-checkbox-label">
                                            <input type="checkbox" className="form-check-input me-2" /> Remember me
                                        </label>
                                        <Link to={'/ForgotPassword'} className="text-decoration-none fw-medium login4-forgot-link">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <button className="btn py-3 w-100 rounded-pill mt-4 fw-bold border-0 text-white login4-btn">
                                        LOGIN
                                    </button>
                                    <div className="text-center mt-4">
                                        <p className="text-secondary-emphasis login4-or-text">
                                            Or login with
                                        </p>
                                        <div className="d-flex justify-content-center gap-3">
                                            <span className="d-inline-flex align-items-center justify-content-center rounded-circle text-white login4-social-icon facebook">
                                                <FaFacebookF />
                                            </span>
                                            <span className="d-inline-flex align-items-center justify-content-center rounded-circle text-white login4-social-icon twitter">
                                                <FaTwitter />
                                            </span>
                                            <span className="d-inline-flex align-items-center justify-content-center rounded-circle text-white login4-social-icon google">
                                                <FaGoogle />
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Login