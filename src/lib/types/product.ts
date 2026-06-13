


export type ProductType = {
    uuid: string;
    thumbnail: string;
    name: string;
    description: string;
    priceOut: number;
    discount: number;
};

export type FilterType = {
  category?: string;
  brand?: string
}

export type Filters = {
  categoryUuid?: string;
  brandUuid?: string;
};

export interface ProductResponse {
    content: ProductType[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
}



export interface Brand {
  name: string;
  uuid: string;
  description: string;
  brandLogo: string;
}

export type BrandListResponse = Brand[];

export interface Category {
  name: string; 
  uuid: string;
  description?: string;
}

export type CategoryListResponse = Category[];








export type CreateProductType ={ 
  name: string,
  description: string,
  computerSpec: {
    processor: string,
    ram: string,
    storage: string,
    gpu: string,
    os: string,
    screenSize: string,
    battery: string
  },
  stockQuantity: number,
  priceIn: number,
  priceOut: number,
  discount: number,
  color: [
    {
      color: string,
      images: [
        string
      ]
    }
  ],
  thumbnail: string,
  warranty: string,
  availability: boolean,
  images: [
    string
  ],
}
