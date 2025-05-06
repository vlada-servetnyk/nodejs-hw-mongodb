import { contactCollection } from "../db/model/Contact.js";

export const getContacts = () => contactCollection.find();

export const getContactById = (id) => contactCollection.findOne({ _id: id });

export const createContact = async (payload) => {
    const newContact = await contactCollection.create(payload);
    return newContact;
};

export const updateContact = async (id, payload) => {
    const result = await contactCollection.findOneAndUpdate({ _id: id }, payload, {
        new: true
    });

    return result;
};

export const deletContact = async (id) => {
    const result = await contactCollection.findOneAndDelete({ _id: id });
    return result;
};