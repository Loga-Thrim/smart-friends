const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: String,
    name: String,
    age: Number,
    gender: String,
    picture: String,
    grade: Number,
    faculty: String,
    major: String,
    createdProfile: {type: Boolean, default: false}
})

export const UserModel = mongoose.models.users || mongoose.model("users", userSchema)