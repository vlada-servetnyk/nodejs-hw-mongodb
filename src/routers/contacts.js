import { Router } from 'express';
import { createNewContactController, deleteContactControllers, getContactByIdController, getContactsController, updateContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const contactRouter = Router();

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactRouter.post('/', ctrlWrapper(createNewContactController));

contactRouter.patch('/:contactId', ctrlWrapper(updateContactController));

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactControllers));