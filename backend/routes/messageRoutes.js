import {Router} from 'express';

import { sendMessage,getMessages } from '../controllers/messageController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = Router();

// send message route
router.post("/send/:id",protectRoute,sendMessage);

// get messages by id route
router.get('/:id',protectRoute,getMessages);

export default router;