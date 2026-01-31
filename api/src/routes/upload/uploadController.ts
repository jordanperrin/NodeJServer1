import { Request, Response, NextFunction } from 'express';
import { uploadToS3 } from '../../services/s3';
import crypto from 'crypto';

export async function uploadImages(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      const error: any = new Error('No files uploaded');
      error.status = 400;
      return next(error);
    }

    // Upload all images to S3 in parallel
    const uploads = await Promise.all(files.map(async (file) => {
      const key = `photos/${Date.now()}-${crypto.randomUUID()}.jpg`;
      const url = await uploadToS3(file.buffer, key, file.mimetype);
      return { url, key };
    }));

    res.status(200).json({ images: uploads });
  } catch (e) {
    next(e);
  }
}
