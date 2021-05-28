export class Category {
    id?: string;
    englishName?: string;
    arabicName?: string;
    imageUrl?: string;
    childrenProducts: Product[];
}

export class Product {
    id?: string;
    englishTitle?: string;
    arabicTitle?: string;
    englishDescription?: string;
    arabicDescription?: string;
    price?: number;
    totalQuantity?: number;
    parentId?: string;
}