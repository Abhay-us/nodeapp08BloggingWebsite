import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import axiosinterceptor from "../services/axiosinterceptor"

const PostTable = () => {
    const [post, setPost] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState(null);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            postName: "",
            description: ""
        }
    });
    const fetchPost = async () => {
        try {
            // const response = await axiosinterceptor.get('/post/get');
            const response = await axiosinterceptor.get('/post/getpostwithauthor');
            setPost(response.data);
        } catch (error) {
            console.log("Unable To fetch Posts", error);

        }
    }

    const postUserPost = async (data) => {
        try {
            await axiosinterceptor.post('/post/post', data);
            toast.success("Post Added Successfully.", { position: "bottom-right" });
        } catch (error) {
            console.log("Unable to post ", error)
        }
    }

    const fetchNameAndId = async () => {
        try {
            const response = await axiosinterceptor.get('/user/getuseridandname');
            console.log("user",response);
            setUser(response.data);
        } catch (error) {
            console.log("Unable To fetch User Id And Name", error);

        }
    }

    const submitForm = async (data) => {
        await postUserPost(data);
        reset();
        fetchPost();
        setShowForm(false);
    }

    useEffect(() => {
        fetchPost();
        fetchNameAndId();
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
            {!showForm && (
                <div className="card mx-5">
                    <div className="card-header d-flex justify-content-between">
                        <h4>
                            Posts User
                        </h4>
                        <Button type="button" variant="primary"
                            onClick={() => {
                                setShowForm(true);
                                reset({
                                    postName: "",
                                    description: "",
                                    author: "",
                                    createdAt: ""
                                });
                            }}>
                            Add New Post
                        </Button>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Post Name</th>
                                        <th>Description</th>
                                        <th>Created By</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {post.map((post, index) => (
                                        <tr key={post._id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {post.postName}
                                            </td>
                                            <td>
                                                {post.shortDescription}
                                            </td>

                                            <td>
                                                {/* {post?.authordetail?.name} */}
                                                {post.authorname}
                                            </td>

                                            <td>
                                                {post.createdAt}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {showForm && (
                <div className="card">
                    <div className="card-header">
                        <h4 >
                            Add Post
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(submitForm)}>
                            <div className="mb-3">
                                <label>Post Name</label>
                                <input className="form-control" type="text"
                                    {...register("postName")} placeholder="Enter Post Name" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" type="text" rows="5"
                                    {...register("description")} placeholder="Wrtie Description" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author ID</label>

                                <input
                                    className="form-control"
                                    type="text"
                                    {...register("author")}
                                    placeholder={localStorage.getItem(user).name}
                                />

                                {/* <select
                                    className="form-control"
                                    {...register("author")}
                                >
                                    <option value="">Select Author</option>
                                    {user.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select> */}
                            </div>
                            <div className="d-flex gap-2">
                                <Button type="submit" variant="primary">
                                    Add Post
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => {
                                    reset();
                                    setShowForm(false);
                                }}>
                                    Cancel
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            )}


        </>
    )
}

export default PostTable