export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Beauty",
  "Sports",
  "Toys",
  "Grocery",
];

const adjectives = ["Pro", "Ultra", "Smart", "Eco", "Premium", "Classic", "Modern", "Mini", "Max", "Lite"];
const nouns = [
  "Headphones", "T-Shirt", "Blender", "Novel", "Lipstick", "Sneakers", "Drone", "Coffee",
  "Watch", "Jacket", "Toaster", "Notebook", "Serum", "Yoga Mat", "Puzzle", "Snack Pack",
  "Speaker", "Jeans", "Vacuum", "Cookbook", "Perfume", "Dumbbells", "RC Car", "Tea Set",
];

function seeded(i: number) {
  // deterministic pseudo-random
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const PRODUCTS: Product[] = Array.from({ length: 240 }, (_, i) => {
  const r1 = seeded(i + 1);
  const r2 = seeded(i + 101);
  const r3 = seeded(i + 201);
  const r4 = seeded(i + 301);
  const r5 = seeded(i + 401);
  const category = categories[Math.floor(r1 * categories.length)];
  const name = `${adjectives[Math.floor(r2 * adjectives.length)]} ${nouns[Math.floor(r3 * nouns.length)]} ${i + 1}`;
  return {
    id: i + 1,
    name,
    category,
    price: Math.round((10 + r4 * 490) * 100) / 100,
    discount: Math.round(r5 * 70),
    rating: Math.round((1 + seeded(i + 501) * 4) * 10) / 10,
    reviewCount: Math.floor(seeded(i + 601) * 2000),
  };
});

export const CATEGORIES = categories;
