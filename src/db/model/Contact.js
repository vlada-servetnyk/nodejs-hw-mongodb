import { Schema, model } from "mongoose";
import { contactTypeList } from "../../constants/contacts.js";

const contactSchema = new Schema({
    userId: {
        type:  Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: String,
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: contactTypeList,
        require: true,
        default: contactTypeList[0],
    },
    photo: {
        type: String,
        required: false,
        default: null,
    }
},
    {
        timestamps: true,
        versionKey: false
     }
);

export const contactCollection = model('contact', contactSchema);