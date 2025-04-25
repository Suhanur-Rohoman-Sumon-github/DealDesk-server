

export type TProduct = {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  rating: string[];
  numReviews: number;
  discount?: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  shippingAndReturns?: string;
  status :string
}

export type IPaginationOptions = {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type TProductFilterRequest = {
  searchTerm?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  sort?: string
}
