import { Router } from 'express';
import {listUsers, getUserById, createUser, updateUser, deleteUser} from './userController';
import { getRatingsByUser, createRating } from '../rating/ratingController';
import { getCommentsByUser, createComment } from '../comment/commentController';
import { createUserSchema, updateUserSchema} from '../../db/schema/usersSchema';
import { createRatingSchema } from '../../db/schema/ratingsSchema';
import { createCommentSchema } from '../../db/schema/commentsSchema';
import {validateData, updatedAt} from '../../middleware';

const router = Router();

router.get('/:userId/rating', getRatingsByUser);
router.post('/:userId/rating', validateData(createRatingSchema), createRating);

router.get('/:userId/comment', getCommentsByUser);
router.post('/:userId/comment', validateData(createCommentSchema), createComment);

router.get('/:id', getUserById);
router.get('/', listUsers);
router.post('/',validateData(createUserSchema), createUser);
router.put('/:id', updatedAt, validateData(updateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;