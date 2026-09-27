const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postName: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 100 },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const postTable = mongoose.model('posts', postSchema);

module.exports = postTable;