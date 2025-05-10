import { Router } from 'express';
import { createNewContactController, deleteContactControllers, getContactByIdController, getContactsController, updateContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { addContactValid, updateContactValid } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import multer from 'multer';
import { upload } from '../middlewares/multer.js';

export const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactRouter.post('/', upload.single('photo'), validateBody(addContactValid), ctrlWrapper(createNewContactController));

contactRouter.patch('/:contactId', upload.single('photo'), isValidId, validateBody(updateContactValid), ctrlWrapper(updateContactController));

contactRouter.delete('/:contactId', isValidId, ctrlWrapper(deleteContactControllers));