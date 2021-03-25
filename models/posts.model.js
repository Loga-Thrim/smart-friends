const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    place: String,
    timeStart: String,
    timeEnd: String,
    gender: String,
    grade: String,
    img: String,
    num: String,
    join: String
})

//module.exports = mongoose.model("posts", postSchema)
export const PostModel = mongoose.models.posts || mongoose.model("posts", postSchema)