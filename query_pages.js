import mongoose from 'mongoose';
import Page from './models/Page.js';

const uri = 'mongodb://127.0.0.1:27017/ecommerce_admin';

async function main() {
  await mongoose.connect(uri);
  console.log('--- Pages in Database ---');
  const pages = await Page.find({}, { title: 1, slug: 1, _id: 0 });
  console.log(pages);
  await mongoose.disconnect();
}

main();
