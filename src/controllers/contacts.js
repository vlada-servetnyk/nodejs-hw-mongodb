import createHttpError from 'http-errors';
import { getContacts, getContactById, createContact, updateContact, deletContact } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const data = await getContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    const data = await getContactById(contactId);

    if (!data) {
        throw createHttpError(404, "Contact not found");
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const createNewContactController = async (req, res) => {
    const newContact = await createContact(req.body);
    
    res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const data = await updateContact(contactId, req.body);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data
    });
};

export const deleteContactControllers = async (req, res) => {
    const { contactId } = req.params;
    const data = await deletContact(contactId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.status(204).send();
};