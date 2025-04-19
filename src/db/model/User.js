import { Schema, model } from "mongoose";
import { emailRegexp } from "../../constants/auth.js";

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

const UserCollection = model('user', userSchema);

export default UserCollection;