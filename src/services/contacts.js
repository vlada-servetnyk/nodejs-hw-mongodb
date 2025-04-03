import { contactCollection } from "../db/model/Contact.js";

export const getContacts = () => contactCollection.find();

export const getContactById = (id) => contactCollection.findOne({ _id: id });

export const createContact = async (payload) => {
    const newContact = await contactCollection.create(payload);
    return newContact;
};