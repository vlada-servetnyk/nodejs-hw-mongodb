import createHttpError from 'http-errors';
import { getContacts, getContactById, createContact, updateContact, deletContact } from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
    const paginationParams = parsePaginationParams(req.query);
    const sortParams = parseSortParams(req.query);
    const userId = req.user._id;
    const data = await getContacts({userId, ...paginationParams, ...sortParams});

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const userId = req.user._id;
    const { contactId } = req.params;

    const data = await getContactById(contactId, userId);

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
    const { _id: userId } = req.user;
    let photoUrl = null;

    if (req.file) {
        photoUrl = await saveFileToCloudinary(req.file);
    };
    const newContact = await createContact({
        ...req.body,
        userId,
        photo: photoUrl
    });
    
    res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContactController = async (req, res) => {
    const userId = req.user._id;
    const { contactId } = req.params;
    let photoUrl = null;

    if (req.file) {
        photoUrl = await saveFileToCloudinary(req.file);
    };

    const updatedData = { ...req.body };
    if (photoUrl) updatedData.photo = photoUrl;

    const data = await updateContact(contactId, userId, updatedData);

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
    const userId = req.user._id;
    const { contactId } = req.params;
    const data = await deletContact(contactId, userId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    };

    res.status(204).send();
};

