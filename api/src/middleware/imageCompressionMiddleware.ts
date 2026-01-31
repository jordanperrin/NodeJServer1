import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import heicConvert from 'heic-convert';

async function convertHeicToJpeg(buffer: Buffer): Promise<Buffer> {
  const outputBuffer = await heicConvert({
    buffer: buffer as unknown as ArrayBuffer,
    format: 'JPEG',
    quality: 1
  });
  return Buffer.from(outputBuffer);
}

export async function compressImages(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return next();
    }

    // Compress all images in parallel
    await Promise.all(files.map(async (file) => {
      let inputBuffer = file.buffer;

      // Convert HEIC/HEIF to JPEG first (Sharp doesn't support HEIC)
      if (file.mimetype === 'image/heic' || file.mimetype === 'image/heif') {
        inputBuffer = await convertHeicToJpeg(inputBuffer);
      }

      const compressed = await sharp(inputBuffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      file.buffer = compressed;
      file.mimetype = 'image/jpeg';
    }));

    next();
  } catch (e) {
    next(e);
  }
}
