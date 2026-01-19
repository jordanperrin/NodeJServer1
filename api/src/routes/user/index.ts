import { Router } from 'express';
import {listUsers, getUserById, createUser, updateUser, deleteUser} from './userController';
import { getRatingsByUser, createRating } from '../rating/ratingController';
import { getCommentsByUser } from '../comment/commentController';
import { getWantToTryByUser, addToWantToTry, removeFromWantToTry } from '../want-to-try/wantToTryController';
import { createUserSchema, updateUserSchema} from '../../db/schema/usersSchema';
import { createRatingSchema } from '../../db/schema/ratingsSchema';
import { createWantToTrySchema } from '../../db/schema/wantToTryShema';
import {validateData, updatedAt} from '../../middleware';

const router = Router();

router.get('/:userId/rating', getRatingsByUser);
router.post('/:userId/rating', validateData(createRatingSchema), createRating);

router.get('/:userId/comment', getCommentsByUser);

router.get('/:userId/want-to-try', getWantToTryByUser);
router.post('/:userId/want-to-try', validateData(createWantToTrySchema), addToWantToTry);
router.delete('/:userId/want-to-try/:shopId', removeFromWantToTry);

router.get('/:id', getUserById);
router.get('/', listUsers);
router.post('/',validateData(createUserSchema), createUser);
router.put('/:id', updatedAt, validateData(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;