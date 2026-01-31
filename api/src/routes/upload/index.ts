import { Router } from 'express';
import { uploadImages } from './uploadController';
import { upload } from '../../middleware/uploadMiddleware';
import { compressImages } from '../../middleware/imageCompressionMiddleware';

const router = Router();

// Accepts up to 5 images with field name 'images'
router.post('/', upload.array('images', 5), compressImages, uploadImages);

export default router;
