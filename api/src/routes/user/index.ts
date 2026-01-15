import { Router } from 'express';
import {listUsers, getUserById, createUser, updateUser, deleteUser} from './userController';
import { createUserSchema, updateUserSchema} from '../../db/schema/usersSchema';
import {validateData, updatedAt} from '../../middleware';

const router = Router();

router.get('/:id', getUserById);
router.get('/', listUsers);
router.post('/',validateData(createUserSchema), createUser);
router.put('/:id', updatedAt, validateData(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;