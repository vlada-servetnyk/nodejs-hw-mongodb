import { sortList } from "../constants/index.js";
import { contactCollection } from "../db/model/Contact.js";
import { calcPaginationData } from "../utils/calcPaginationData.js";

export const getContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = sortList[0]
    }) => {
    
    const skip = (page - 1) * perPage;

    const filter = { userId };

    const data = await contactCollection
        .find(filter)
        .skip(skip)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder });
    
    const totalItems = await contactCollection.find().countDocuments(filter);
    const paginationData = calcPaginationData({ page, perPage, totalItems });

    return {
        data,
        page: totalItems == 0 ? 0 : page,
        perPage: totalItems < 10 ? data.length : perPage,
        totalItems,
        ...paginationData,
    };
};

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

