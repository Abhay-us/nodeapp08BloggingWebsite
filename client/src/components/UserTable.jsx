import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userValidation } from "../validation/userValidation";
import { Button } from "react-bootstrap";
import axiosinterceptor from "../services/axiosinterceptor";

const UserTable = () => {
    const navigate = useNavigate();

    const [user, setUsers] = useState([]);

    const [editUser, setEditUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const { register, formState: { errors }, reset, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phoneNumber: "",
            gender: ""
        }
    });

    const fetchUsers = async () => {
        try {
            const response = await axiosinterceptor.get('/user/get');
            setUsers(response.data);

        } catch (error) {
            console.log("Unable to Fetch User", error);
            toast.error("Unable to fetch user");
        }
    }

    const fetchUsersById = async (id) => {
        try {
            const response = await axiosinterceptor.get(`/user/getById/${id}`);
            setSelectedUser(response.data);

        } catch (error) {
            console.log("Unable to Fetch User", error);
            toast.error("Unable to fetch user");
        }
    }

    const submitForm = async (data) => {
        await postUser(data);
        reset();
        fetchUsers();
        navigate('/', { replace: true });
    }

    const postUser = async (data) => {
        try {
            await axiosinterceptor.post(`/user/post`, data)
            toast.success("User Added Successfully.", { position: "bottom-right" })
            setShowForm(false);
        } catch (error) {
            console.log("Unable to post user", error)
        }
    }

    const putUser = async (id, data) => {
        try {
            await axiosinterceptor.put(`/user/put/${id}`, data)
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
    const submitEditForm = async (data) => {
        await putUser(editUser._id, data);
        fetchUsers();
        setShowForm(false);
        toast.dark("User Updated successfully", { position: "top-center" });
        reset();
    }
    const deleteUser = async (id) => {
        try {
            await axiosinterceptor.delete(`/user/delete/${id}`);
            fetchUsers();
            toast.warn("Deleted Successfully", { position: "top-right" })

        } catch (error) {
            console.error('unable to delte:', error);

        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
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

            {!showForm && !selectedUser && (
                <div className="card mx-5">
                    <div className="card-header d-flex justify-content-between">
                        <h4 className="mb-0">
                            All Users
                        </h4>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setEditUser(null);
                                reset({
                                    name: "",
                                    email: "",
                                    password: "",
                                    phoneNumber: "",
                                    gender: ""
                                });
                                setShowForm(true);
                            }}
                        >
                            Add User
                        </Button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {user.name}
                                            </td>
                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {user.phoneNumber}
                                            </td>

                                            <td>
                                                {user.gender}
                                            </td>
                                            <td>
                                                {/* Info */}
                                                <Button
                                                    onClick={() => {
                                                        fetchUsersById(user._id);
                                                    }}
                                                    className="btn btn-info me-2 text-white"
                                                >
                                                    Info
                                                </Button>
                                                {/* Edit */}
                                                <Button
                                                    variant="warning"
                                                    className="me-2"
                                                    onClick={() => {
                                                        setShowForm(true);
                                                        setEditUser(user);
                                                        reset({
                                                            name: user.name,
                                                            email: user.email,
                                                            phoneNumber: user.phoneNumber,
                                                            gender: user.gender,
                                                            password: user.password
                                                        });
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                                {/* Delete */}
                                                <Button
                                                    variant="danger"
                                                    className="text-white"
                                                    onClick={() => {
                                                        const confirmDelete =
                                                            window.confirm(
                                                                `Are you sure you want to delete ${user.name}?`
                                                            );
                                                        if (confirmDelete) {
                                                            deleteUser(user._id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {selectedUser && (
                <div className="card mx-5 mb-4">
                    <div className="card-header">
                        <h4 className="mb-0">User Information</h4>
                    </div>

                    <div className="card-body">
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                    <th>Gender</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{selectedUser._id}</td>
                                    <td>{selectedUser.name}</td>
                                    <td>{selectedUser.phoneNumber}</td>
                                    <td>{selectedUser.gender}</td>
                                </tr>
                            </tbody>
                        </table>

                        <Button
                            variant="secondary"
                            onClick={() => {
                                setSelectedUser(null);
                            }}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            )}
            {showForm && (
                <div className="card mx-5 mb-4">
                    <div className="card-header">
                        <h4 className="mb-0">
                            {editUser ? "Edit User" : "Add User"}
                        </h4>
                    </div>
                    <div className="card-body">
                        <form
                            onSubmit={handleSubmit(
                                editUser ? submitEditForm : submitForm
                            )}
                        >
                            <div className="mb-3">
                                <label className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    {...register(
                                        "name",
                                        userValidation.name
                                    )}
                                    className="form-control"
                                    placeholder="Enter Name"
                                />
                                {errors.name && (
                                    <p className="text-danger">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    {...register(
                                        "email",
                                        userValidation.email
                                    )}
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                                {errors.email && (
                                    <p className="text-danger">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    {...register(
                                        "password",
                                        userValidation.password
                                    )}
                                    className="form-control"
                                    placeholder="Enter password"
                                />
                                {errors.password && (
                                    <p className="text-danger">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    {...register(
                                        "phoneNumber",
                                        userValidation.phoneNumber
                                    )}
                                    className="form-control"
                                    placeholder="Enter Phone"
                                />
                                {errors.phoneNumber && (
                                    <p className="text-danger">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label d-block">
                                    Gender
                                </label>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="male"
                                        {...register(
                                            "gender",
                                            userValidation.gender
                                        )}
                                    />

                                    <label className="form-check-label">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        value="female"
                                        {...register(
                                            "gender",
                                            userValidation.gender
                                        )}
                                    />
                                    <label className="form-check-label">
                                        Female
                                    </label>
                                </div>
                                {errors.gender && (
                                    <p className="text-danger">
                                        Gender Is required
                                    </p>
                                )}
                            </div>
                            {/* Buttons */}
                            <div className="d-flex gap-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                >
                                    {editUser ? "Update User" : "Add User"}
                                </Button>
                                {editUser && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => {
                                            reset();
                                            setShowForm(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UserTable
