import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    accessToken: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    },
}, { versionKey: false, timestamps: true });

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;