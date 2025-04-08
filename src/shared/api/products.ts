import { Product } from '../types/product';

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 13",
    price: 799,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-product-red-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629907846000",
    description: "The latest iPhone with A15 Bionic chip and dual camera system."
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    price: 749,
    image: "https://images.samsung.com/us/smartphones/galaxy-s22/images/galaxy-s22-share-image.jpg",
    description: "Flagship Android phone with premium features and excellent camera."
  },
  {
    id: 3,
    name: "Google Pixel 6",
    price: 599,
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Pixel_6_coming_soon_2.jpg",
    description: "Google's flagship phone with advanced AI capabilities."
  },
  {
    id: 4,
    name: "OnePlus 9",
    price: 649,
    image: "https://www.oneplus.com/content/dam/oasis/page/2021/9-series/spec-image/9/9-winter-mist.png",
    description: "Fast and smooth performance with Hasselblad camera system."
  },
  {
    id: 5,
    name: "Xiaomi Mi 11",
    price: 699,
    image: "https://i01.appmifile.com/webfile/globalimg/products/pc/mi11/specs-header.png",
    description: "Powerful smartphone with excellent value for money."
  },
  {
    id: 6,
    name: "iPhone 12",
    price: 699,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000",
    description: "Previous generation iPhone with A14 Bionic chip."
  }
];

export interface ProductsResponse {
  items: Product[];
  total: number;
  hasMore: boolean;
}

export const getProducts = async (page: number = 1, limit: number = 3): Promise<ProductsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = products.slice(start, end);
  
  return {
    items,
    total: products.length,
    hasMore: end < products.length
  };
};

export const getProduct = async (id: number): Promise<Product | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return products.find(product => product.id === id) || null;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery)
  );
};
