import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pharma_uploads',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'avif', 'gif']
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Helper to map Cloudinary path URL to filename so controllers read it directly
const mapCloudinaryUrl = (req) => {
  if (req.file) {
    req.file.filename = req.file.path;
  }
  if (req.files) {
    for (const key in req.files) {
      if (Array.isArray(req.files[key])) {
        req.files[key].forEach((file) => {
          file.filename = file.path;
        });
      }
    }
  }
};

// Wrap multer upload functions to map file.path to file.filename
export const upload = {
  single: (fieldname) => {
    const original = multerUpload.single(fieldname);
    return (req, res, next) => {
      original(req, res, (err) => {
        if (err) return next(err);
        mapCloudinaryUrl(req);
        next();
      });
    };
  },
  array: (fieldname, maxCount) => {
    const original = multerUpload.array(fieldname, maxCount);
    return (req, res, next) => {
      original(req, res, (err) => {
        if (err) return next(err);
        mapCloudinaryUrl(req);
        next();
      });
    };
  },
  fields: (fields) => {
    const original = multerUpload.fields(fields);
    return (req, res, next) => {
      original(req, res, (err) => {
        if (err) return next(err);
        mapCloudinaryUrl(req);
        next();
      });
    };
  }
};
