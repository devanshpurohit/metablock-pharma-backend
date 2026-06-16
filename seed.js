import mongoose from 'mongoose';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Brand from './models/Brand.js';

const uri = 'mongodb://127.0.0.1:27017/ecommerce_admin';

const brandsData = [
  { name: "Bull Pharma", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/bull-pharma-steroids-logo-160x160.png.webp" },
  { name: "Pharmaqo Labs", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/pharmaqo-labs-logo-160x160.png.webp" },
  { name: "Evolve Biolabs", logo: "https://www.getroids1.net/image/cache/catalog/BRANDS/evolve-biolabs-india-160x160.png.webp" },
  { name: "XT Labs", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/xt-labs-logo-160x160.png.webp" },
  { name: "Xeno Labs", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/xeno-labs-logo-160x160.png.webp" },
  { name: "Kassel Pharma", logo: "https://www.getroids1.net/image/cache/catalog/BRANDS/kassel-pharma-logo-160x160.png.webp" },
  { name: "PeptidePlus", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/peptide-plus-logo-160x160.png.webp" },
  { name: "Driada Medical", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/driada-medical-logo-160x160.png.webp" },
  { name: "Omega Labs", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/omega-labs-steroids-logo-160x160.png.webp" },
  { name: "Sixpex", logo: "https://www.getroids1.net/image/cache/catalog/BRAND%20LOGOS/sixpex-logo-160x160.png.webp" }
];

const categoriesData = [
  { name: "Anabolic Steroids", slug: "anabolic-steroids" },
  { name: "Injectable Steroids", slug: "injectable-steroids" },
  { name: "Oral Steroids", slug: "oral-steroids" },
  { name: "HGH / Peptides", slug: "hgh-peptides" },
  { name: "Fat Burners", slug: "fat-burners" },
  { name: "Post Cycle Therapy", slug: "post-cycle-therapy" },
  { name: "USA Domestic", slug: "usa-domestic" },
  { name: "UK Domestic", slug: "uk-domestic" },
  { name: "EU Domestic", slug: "eu-domestic" },
  { name: "Men's Health", slug: "mens-health" },
  { name: "Cycles (Steroid Programs)", slug: "cycles-steroid-programs" },
  { name: "Lab Test", slug: "lab-test" },
  { name: "Bulk Offers", slug: "bulk-offers" }
];

const productsData = [
  {
    name: "Anavar 10 Pharmaqo Labs US",
    brand: "Pharmaqo Labs",
    category: "Oral Steroids",
    price: 110.00,
    sku: "ph-anavar-10",
    tags: ["anavar", "pill", "pharmaqo"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Anavar+10"
  },
  {
    name: "Nandrodec 300 Pharmaqo Labs US",
    brand: "Pharmaqo Labs",
    category: "Injectable Steroids",
    price: 110.00,
    sku: "ph-nandrodec-300",
    tags: ["injectable", "nandrolone", "pharmaqo"],
    featured: true,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Nandrodec+300"
  },
  {
    name: "Semaglutide 5 PeptidePlus USA",
    brand: "PeptidePlus",
    category: "HGH / Peptides",
    price: 130.00,
    sku: "pep-semaglutide-5",
    tags: ["peptide", "semaglutide", "peptideplus"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Semaglutide+5"
  },
  {
    name: "Retatrutide 5 Peptide Plus USA",
    brand: "PeptidePlus",
    category: "HGH / Peptides",
    price: 119.00,
    sku: "pep-retatrutide-5",
    tags: ["peptide", "retatrutide", "peptideplus"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Retatrutide+5"
  },
  {
    name: "HCG 5000IU PeptidePlus USA",
    brand: "PeptidePlus",
    category: "HGH / Peptides",
    price: 80.00,
    sku: "pep-hcg-5000",
    tags: ["peptide", "hcg", "peptideplus"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=HCG+5000"
  },
  {
    name: "SuperBull 500 Bull Pharma USA",
    brand: "Bull Pharma",
    category: "Injectable Steroids",
    price: 125.00,
    sku: "bull-superbull-500",
    tags: ["injectable", "testosterone", "bullpharma"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=SuperBull+500"
  },
  {
    name: "Trenbolone A 100 Kassel",
    brand: "Kassel Pharma",
    category: "Injectable Steroids",
    price: 115.00,
    sku: "kas-trenbolone-a-100",
    tags: ["injectable", "trenbolone", "kassel"],
    featured: true,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Trenbolone+A+100"
  },
  {
    name: "Multi-Ester Test 400 Pharmaqo Labs US",
    brand: "Pharmaqo Labs",
    category: "Injectable Steroids",
    price: 95.0,
    sku: "ph-test-400",
    tags: ["testosterone", "injectable", "pharmaqo"],
    featured: true,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Multi-Ester+Test+400"
  },
  {
    name: "Tirzepatide 5 PeptidePlus USA",
    brand: "PeptidePlus",
    category: "HGH / Peptides",
    price: 130.0,
    sku: "pep-tirzepatide-5",
    tags: ["tirzepatide", "peptideplus"],
    featured: true,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Tirzepatide+5"
  },
  {
    name: "Dbol 20 mg 50 Tabs Xeno US",
    brand: "Xeno Labs",
    category: "Oral Steroids",
    price: 89.0,
    sku: "xeno-dbol-20",
    tags: ["dbol", "xenolabs"],
    featured: false,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Dbol+20+mg"
  },
  {
    name: "Testosterone Enanthate 250 mg US",
    brand: "Pharmaqo Labs",
    category: "Injectable Steroids",
    price: 75.0,
    sku: "ph-test-enanthate-250",
    tags: ["testosterone", "pharmaqo"],
    featured: false,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Test+Enanthate+250"
  },
  {
    name: "Ultima-Prop 100 mg Ultima Pharma INT",
    brand: "Ultima Pharma",
    category: "Injectable Steroids",
    price: 45.0,
    sku: "ultima-prop-100",
    tags: ["propionate", "ultimapharma"],
    featured: false,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Ultima-Prop+100"
  },
  {
    name: "Arimidex 1 mg 30 Tablets Xeno US",
    brand: "Xeno Labs",
    category: "Post Cycle Therapy",
    price: 86.0,
    sku: "xeno-arimidex-1",
    tags: ["arimidex", "pct", "xenolabs"],
    featured: false,
    trending: false,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Arimidex+1+mg"
  },
  {
    name: "Tamox 20 Evolve BioLabs INT",
    brand: "Evolve Biolabs",
    category: "Post Cycle Therapy",
    price: 25.0,
    sku: "evolve-tamox-20",
    tags: ["tamox", "pct", "evolve"],
    featured: false,
    trending: true,
    image: "https://placehold.co/600x600/f5f5f5/734B1A?text=Tamox+20"
  }
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    // Clear existing collections
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Brand.deleteMany({})
    ]);
    console.log('Cleared existing collections.');

    // Insert Brands
    const createdBrands = await Brand.insertMany(
      brandsData.map(b => ({ brandName: b.name, logo: b.logo }))
    );
    console.log(`Seeded ${createdBrands.length} brands.`);

    // Insert Categories
    const createdCategories = await Category.insertMany(
      categoriesData.map(c => ({ categoryName: c.name, slug: c.slug }))
    );
    console.log(`Seeded ${createdCategories.length} categories.`);

    // Map names to ObjectIds for products seeding
    const brandMap = {};
    createdBrands.forEach(b => {
      brandMap[b.brandName] = b._id;
    });

    const categoryMap = {};
    createdCategories.forEach(c => {
      categoryMap[c.categoryName] = c._id;
    });

    // Seed Products
    const productsToSeed = productsData.map(p => {
      const brandId = brandMap[p.brand];
      const categoryId = categoryMap[p.category];

      if (!brandId) {
        console.warn(`Warning: Brand "${p.brand}" not found for product "${p.name}"`);
      }
      if (!categoryId) {
        console.warn(`Warning: Category "${p.category}" not found for product "${p.name}"`);
      }

      return {
        productName: p.name,
        brandId: brandId || createdBrands[0]._id,
        categoryId: categoryId || createdCategories[0]._id,
        shortDescription: `${p.name} high-grade pharmaceutical product.`,
        description: `${p.name} is manufactured to meet rigorous quality standards for purity and potency. Ideal for bodybuilders and performance athletes.`,
        mainImage: p.image,
        galleryImages: [p.image],
        price: p.price,
        discountPrice: p.price * 0.9,
        stock: 50,
        sku: p.sku,
        tags: p.tags,
        featured: p.featured,
        trending: p.trending,
        status: true
      };
    });

    const createdProducts = await Product.insertMany(productsToSeed);
    console.log(`Seeded ${createdProducts.length} products.`);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

seed();
