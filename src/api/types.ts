export type Nullable<T> = T | null | undefined;

export interface Product {
  identifier: string;
  collection: string;
  contract: string;
  token_standard: string;
  name: string;
  description: string;
  image_url: string;
  metadata_url: string;
  opensea_url: string;
  updated_at: string;
  is_disabled: boolean;
  is_nsfw: boolean;
}

export interface ProductInCart {
  identifier: string;
  collectionName: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Cart {
  products: ProductInCart[];
}
