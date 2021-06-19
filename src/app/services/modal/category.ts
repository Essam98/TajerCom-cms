export class Category {
    _id?: string;
    englishNameCategory?: string;
    arabicNameCategory?: string;
    imageUrl?: string;
    subCategories: string;
}

export class SubCategory {
    id?: string;
    englishName?: string;
    arabicName?: string;
    imageUrl?: string;
    parentCategory: string;
    product: Product[];
}

export class Product {
    id?: string;
    englishName?: string;
    arabicName?: string;
    englishDescription?: string;
    arabicDescription?: string;
    imageUrl?: string;
    price?: number;
    totalQuantity?: number; //optional
    parentId?: number;
}