const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


productSchema = new mongoose.Schema({
    englishNameProduct: String,
    arabicNameProduct: String,
    englishDescriptionProduct: String,
    arabicDescriptionProduct: String,
    price: Number,
    totalQuantity: Number,
    isWholesale: Boolean,
})

const Product = mongoose.model('Products', productSchema);


subCategorySchema = new mongoose.Schema ({
    englishNameSubCategory: String,
    arabicNameSubCategory: String,
    products: [productSchema]
})

const SubCategory = mongoose.model('SubCategories', subCategorySchema);



categorySchema = new mongoose.Schema({
    englishNameCategory: String,
    arabicNameCategory:  String,
    subCategory: [subCategorySchema],
})

const Category = mongoose.model('Categories', categorySchema);



async function addNewGroup(englishNameCategory, arabicNameCategory, subCategory) {

    const category = new Category({
        englishNameCategory,
        arabicNameCategory,
        subCategory
    })
    await category.save();
} 

addNewGroup("enCat", "arCat",
    [
        new SubCategory({
          englishNameSubCategory: "enSubCat1", 
          arabicNameSubCategory: "arSubCat1",
          products: [
            new Product({
              englishNameProduct: "englishProduct1",
              arabicNameProduct: "arabicProduct1",
              englishDescriptionProduct: "englishDesProduct1",
              arabicDescriptionProduct: "arabicDesProduct1",
              price: 45.6,
              totalQuantity: 88,
              isWholesale: true,
            }),
            new Product({
              englishNameProduct: "englishProduct2",
              arabicNameProduct: "arabicProduct2",
              englishDescriptionProduct: "englishDesProduct2",
              arabicDescriptionProduct: "arabicDesProduct2",
              price: 45.6,
              totalQuantity: 88,
              isWholesale: true,
            }), 
          ]
        }),
        new SubCategory({
          englishNameSubCategory: "enSubCat2",
          arabicNameSubCategory: "arSubCat2",
          products: [
            new Product({
              englishNameProduct: "englishProduct3",
              arabicNameProduct: "arabicProduct3",
              englishDescriptionProduct: "englishDesProduct3",
              arabicDescriptionProduct: "arabicDesProduct3",
              price: 45.6,
              totalQuantity: 88,
              isWholesale: true,
            })
          ]
        }),
        new SubCategory({englishNameSubCategory: "enSubCat3",arabicNameSubCategory: "arSubCat3",}),
    ]
)











