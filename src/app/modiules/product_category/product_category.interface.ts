export type  TProductCategory = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: string;
  createdAt: Date;
  updatedAt: Date;
  isService?: boolean;
  isDeleted?: boolean;
isActive?: boolean;
isFeatured?: boolean;
  
}