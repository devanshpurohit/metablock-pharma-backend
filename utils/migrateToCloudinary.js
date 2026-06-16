import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Import Models
import Product from '../models/Product.js';
import Brand from '../models/Brand.js';
import Category from '../models/Category.js';
import Setting from '../models/Setting.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import Message from '../models/Message.js';
import Banner from '../models/Banner.js';

const uploadsDir = path.join(process.cwd(), 'uploads');

const uploadLocalFile = async (localPath) => {
  if (!localPath) return null;
  const filename = localPath.replace(/^\/?uploads\//, '');
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Local file not found on disk: ${filePath}`);
    return null;
  }

  try {
    console.log(`🚀 Uploading ${filename} to Cloudinary...`);
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'pharma_uploads',
      use_filename: true,
      unique_filename: true
    });
    console.log(`✅ Uploaded: ${res.secure_url}`);
    return res.secure_url;
  } catch (err) {
    console.error(`❌ Failed to upload ${filename}:`, err);
    return null;
  }
};

const runMigration = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is missing in environment!");
    process.exit(1);
  }

  try {
    console.log("Connecting to Database...");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");

    // 1. Categories
    console.log("\nChecking Categories...");
    const categories = await Category.find({ image: /^\/?uploads\// });
    console.log(`Found ${categories.length} categories to migrate.`);
    for (const cat of categories) {
      const url = await uploadLocalFile(cat.image);
      if (url) {
        cat.image = url;
        await cat.save();
      }
    }

    // 2. Brands
    console.log("\nChecking Brands...");
    const brands = await Brand.find({ logo: /^\/?uploads\// });
    console.log(`Found ${brands.length} brands to migrate.`);
    for (const brand of brands) {
      const url = await uploadLocalFile(brand.logo);
      if (url) {
        brand.logo = url;
        await brand.save();
      }
    }

    // 3. Products
    console.log("\nChecking Products...");
    const products = await Product.find({
      $or: [
        { mainImage: /^\/?uploads\// },
        { galleryImages: /^\/?uploads\// }
      ]
    });
    console.log(`Found ${products.length} products to migrate.`);
    for (const prod of products) {
      let updated = false;
      if (prod.mainImage && prod.mainImage.match(/^\/?uploads\//)) {
        const url = await uploadLocalFile(prod.mainImage);
        if (url) {
          prod.mainImage = url;
          updated = true;
        }
      }
      if (prod.galleryImages && prod.galleryImages.length > 0) {
        const newGallery = [];
        for (const img of prod.galleryImages) {
          if (img && img.match(/^\/?uploads\//)) {
            const url = await uploadLocalFile(img);
            newGallery.push(url || img);
            if (url) updated = true;
          } else {
            newGallery.push(img);
          }
        }
        prod.galleryImages = newGallery;
      }
      if (updated) {
        await prod.save();
      }
    }

    // 4. Settings
    console.log("\nChecking Settings...");
    const settings = await Setting.find({
      $or: [
        { siteLogo: /^\/?uploads\// },
        { favicon: /^\/?uploads\// },
        { weShipBanner: /^\/?uploads\// }
      ]
    });
    for (const set of settings) {
      let updated = false;
      if (set.siteLogo && set.siteLogo.match(/^\/?uploads\//)) {
        const url = await uploadLocalFile(set.siteLogo);
        if (url) { set.siteLogo = url; updated = true; }
      }
      if (set.favicon && set.favicon.match(/^\/?uploads\//)) {
        const url = await uploadLocalFile(set.favicon);
        if (url) { set.favicon = url; updated = true; }
      }
      if (set.weShipBanner && set.weShipBanner.match(/^\/?uploads\//)) {
        const url = await uploadLocalFile(set.weShipBanner);
        if (url) { set.weShipBanner = url; updated = true; }
      }
      if (updated) {
        await set.save();
      }
    }

    // 5. Users
    console.log("\nChecking Users...");
    const users = await User.find({ image: /^\/?uploads\// });
    for (const u of users) {
      const url = await uploadLocalFile(u.image);
      if (url) {
        u.image = url;
        await u.save();
      }
    }

    // 6. Reviews
    console.log("\nChecking Reviews...");
    const reviews = await Review.find({ reviewImage: /^\/?uploads\// });
    for (const r of reviews) {
      const url = await uploadLocalFile(r.reviewImage);
      if (url) {
        r.reviewImage = url;
        await r.save();
      }
    }

    // 7. Messages
    console.log("\nChecking Messages...");
    const messages = await Message.find({ attachment: /^\/?uploads\// });
    for (const m of messages) {
      const url = await uploadLocalFile(m.attachment);
      if (url) {
        m.attachment = url;
        await m.save();
      }
    }

    // 8. Banners
    console.log("\nChecking Banners...");
    const banners = await Banner.find({ images: /^\/?uploads\// });
    for (const b of banners) {
      if (b.images && b.images.length > 0) {
        let updated = false;
        const newImages = [];
        for (const img of b.images) {
          if (img && img.match(/^\/?uploads\//)) {
            const url = await uploadLocalFile(img);
            newImages.push(url || img);
            if (url) updated = true;
          } else {
            newImages.push(img);
          }
        }
        b.images = newImages;
        if (updated) {
          await b.save();
        }
      }
    }

    console.log("\n🎉 Migration finished successfully!");
  } catch (err) {
    console.error("❌ Migration failed with error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database.");
  }
};

runMigration();
