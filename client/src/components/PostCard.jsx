import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import axiosinterceptor from "../services/axiosinterceptor";

const PostCard = () => {


    const [post, setPost] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            postName: "",
            description: "",
            author: ""
        }
    });

    const fetchPost = async () => {
        try {
            const response = await axiosinterceptor.get(
                '/post/getpostwithauthor'
            );
            setPost(response.data);
        } catch (error) {
            console.log("Unable To fetch Posts", error);
            toast.error("Unable To Fetch Posts");
        }
    };

    const fetchUsersById = async (id) => {
        try {
            const response = await axiosinterceptor.get(`/user/getbyid/${id}`);
            setSelectedUser(response.data);
        } catch (error) {
            console.log("Unable to Fetch User", error);
            toast.error("Unable to fetch user");
        }
    };
    const postUserPost = async (data) => {
        try {
            console.log("Data sending:", data);
            await axiosinterceptor.post('/post/post', data);
            toast.success(
                "Post Added Successfully",
                {
                    position: "bottom-right"
                }
            );
        } catch (error) {
            console.log("Unable to post", error);
            console.log(
                "Server error:",
                error.response?.data
            );
            toast.error("Unable To Add Post");
        }
    };

    const putPost = async (id, data) => {
        try {
            await axiosinterceptor.put(`/post/put/${id}`, data);
            toast.success(
                "Post Updated Successfully",
                {
                    position: "top-center"
                }
            );

        } catch (error) {
            console.log("Error updating post:", error);
            toast.error("Unable To Update Post");

        }
    };

    const deletePost = async (id) => {
        try {
            await axiosinterceptor.delete(`/post/delete/${id}`);
            toast.success(
                "Post Deleted Successfully", {
                position: "top-right"
            }
            );
            await fetchPost();
        } catch (error) {
            console.log("Unable to delete post:", error);
            toast.error("Unable To Delete Post");
        }
    };

    const submitForm = async (data) => {
        if (editPost) {
            const success = await putPost(editPost._id, data);
            if (success) {
                reset();
                setEditPost(null);
                setShowForm(false);
                await fetchPost();
            }
        }
        else {
            const success = await postUserPost(data);
            if (success) {
                reset();
                setShowForm(false);
                await fetchPost();
            }
        }
    };

    useEffect(() => {
        fetchPost();

    }, []);
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
                            Posts
                        </h4>
                        <Button
                            type="button"
                            variant="primary"
                            onClick={() => {
                                setEditPost(null);
                                reset({
                                    postName: "",
                                    description: "",
                                    author: ""
                                });
                                setShowForm(true);
                            }}
                        >
                            Add New Post
                        </Button>

                    </div>
                    <div className="card-body">
                        <div className="row g-4">
                            {post.map((post) => (
                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={post._id}
                                >
                                    <div className="card h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start">

                                                <h4 className="mb-3">
                                                    {post.postName}
                                                </h4>
                                                <div className="d-flex">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            fetchUsersById(
                                                                post.author
                                                            );

                                                        }}
                                                        className="btn btn-info me-2 text-white"
                                                    >
                                                        Info
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="warning"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setEditPost(post);
                                                            reset({
                                                                postName: post.postName,
                                                                description: post.description
                                                            });
                                                            setShowForm(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        className="text-white"
                                                        onClick={() => {
                                                            deletePost(post._id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="mb-3">
                                                {post.description}
                                            </p>
                                            <div className="mt-auto d-flex justify-content-between">
                                                <p className="mb-0">
                                                    <strong>
                                                        By :
                                                    </strong>{" "}
                                                    {post.authorname}
                                                </p>
                                                <p className="mb-0">
                                                    {post.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedUser && (
                <div className="card mx-5 mb-4">
                    <div className="card-header">
                        <h4 className="mb-0">
                            User Information
                        </h4>
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
                                    <td>
                                        {selectedUser._id}
                                    </td>
                                    <td>
                                        {selectedUser.name}
                                    </td>

                                    <td>
                                        {selectedUser.phoneNumber}
                                    </td>

                                    <td>
                                        {selectedUser.gender}
                                    </td>
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
                <div className="card mx-5">
                    <div className="card-header">
                        <h4 className="mb-0">
                            {editPost
                                ? "Edit Post"
                                : "Add Post"
                            }
                        </h4>
                    </div>
                    <div className="card-body">
                        <form
                            onSubmit={handleSubmit(submitForm)}>
                            <div className="mb-3">
                                <label>
                                    Post Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    {...register("postName")}
                                    placeholder="Enter Post Name"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    {...register("description")}
                                    placeholder="Write Description"
                                />
                            </div>

                            {!editPost && (
                                <div className="mb-3">
                                    <label className="form-label">
                                        Author ID
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        {...register("author")}
                                        placeholder="Enter User ID"
                                    />
                                </div>
                            )}
                            <div className="d-flex gap-2">
                                <Button
                                    type="submit"
                                    variant="primary"
                                >
                                    {editPost
                                        ? "Update Post"
                                        : "Add Post"
                                    }

                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => {
                                        reset();
                                        setEditPost(null);
                                        setShowForm(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default PostCard;