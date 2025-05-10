import Joi from "joi";
import { contactTypeList } from "../constants/contacts.js";

export const addContactValid = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 3 characters long",
            "string.max": "Name must be at most 20 characters long"
        }),
    phoneNumber: Joi.string().required(),
    email: Joi.string(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string()
        .valid(...contactTypeList)
        .required()
        .messages({
            "any.only": "Contact type must be one of: work, home, personal",
        }),
});

export const updateContactValid = Joi.object({
    name: Joi.string()
        .min(3)
        .max(20),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string()
        .valid(...contactTypeList)
});