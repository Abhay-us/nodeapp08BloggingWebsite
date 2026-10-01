const postTable = require("../model/postsmodel");
const userTable = require('../model/usermodel');


exports.getPost = async (req, res) => {
    try {
        const post = await postTable.find();
        res.json(post);
    } catch (error) {
        res.status(400).send("Unable To Fetch Posts");
    }
};

exports.getPostWithAuthor = async (req, res) => {
    try {
        const posts = await postTable.find();

        const postsWithAuthor = await Promise.all(
            posts.map(async (postitem) => {
                const user = await userTable.findById(postitem.author);
                return {
                    ...postitem.toObject(),
                    // authordetail: user
                    authorname: user.name
                };
            })
        );

        console.log("Posts", postsWithAuthor);
        res.json(postsWithAuthor);

    } catch (error) {
        res.status(400).send("Unable To Fetch eeeeeeePosts");
    }
};


exports.getPostById = async (req, res) => {
    try {
        const post = await postTable.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(400).send("Unable To Fetch Post");
    }

};

exports.postPost = async (req, res) => {
    const {
        postName,
        description,
        author
    } = req.body;
    try {
        const shortDescription = description.substring(0, 50);
        const post = new postTable({
            postName,
            description,
            shortDescription,
            author
        });
        await post.save();
        res.json(post);

    } catch (error) {
        res.status(400).send("Unable To Create Post");
    }
};

exports.putPost = async (req, res) => {
    const {
        postName,
        description,
    } = req.body;
    try {
        const post = await postTable.findById(req.params.id);

        const shortDescription = description.substring(0, 50);

        post.postName = postName;
        post.description = description;
        post.shortDescription = shortDescription;
        await post.save();
        res.json(post);

    } catch (error) {
        res.status(400).send("Unable To Update Post");
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postTable.findById(req.params.id);
        await post.deleteOne();
        res.status(200).json({
            message: "Post Deleted Successfully"
        });

    } catch (error) {
        res.status(400).send("Unable To Delete Post");
    }
};