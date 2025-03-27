import { contactCollection } from "../db/model/Contact.js";

export const getContacts = () => contactCollection.find();

export const getContactById = (id) => contactCollection.findOne({_id: id});