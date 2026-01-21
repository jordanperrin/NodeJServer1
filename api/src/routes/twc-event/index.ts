import { Router } from 'express';
import { listEvents, getEventById, createEvent, updateEvent, deleteEvent } from './twcEventController';
import { createTwcEventSchema, updateTwcEventSchema } from '../../db/schema/twcEventsSchema';
import { validateData, updatedAt } from '../../middleware';

const router = Router();

router.get('/', listEvents);
router.get('/:id', getEventById);
router.post('/', validateData(createTwcEventSchema), createEvent);
router.put('/:id', updatedAt, validateData(updateTwcEventSchema), updateEvent);
router.delete('/:id', deleteEvent);

export default router;