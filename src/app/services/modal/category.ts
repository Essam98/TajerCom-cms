export class Category {
    id?: string;
    englishName?: string;
    arabicName?: string;
    imageUrl?: string;
    childrenProducts: Product[];
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