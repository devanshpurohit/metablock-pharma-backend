import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Brand from './models/Brand.js';

const uri = 'mongodb://127.0.0.1:27017/ecommerce_admin';

async function main() {
  await mongoose.connect(uri);
  console.log('--- Categories ---');
  const categories = await Category.find();
  console.log(categories);

  console.log('--- Brands ---');
  const brands = await Brand.find();
  console.log(brands);

  console.log('--- Products ---');
  const products = await Product.find();
  console.log(products);

  await mongoose.disconnect();
}

main();
