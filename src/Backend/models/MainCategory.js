const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

productSchema = new mongoose.Schema({
    englishNameProduct: String,
    arabicNameProduct: String,
    englishDescriptionProduct: String,
    arabicDescriptionProduct: String,
    price: Number,
    totalQuantity: Number,
    isWholesale: Boolean,
    parentId: String,
})

const Product = mongoose.model('Products', productSchema);


subCategorySchema = new mongoose.Schema ({
    englishNameSubCategory: String,
    arabicNameSubCategory: String,
    parentId: String,
    products: [productSchema]
})

const SubCategory = mongoose.model('SubCategories', subCategorySchema);


categorySchema = new mongoose.Schema({
    englishNameCategory: String,
    arabicNameCategory: String,
    subCategory: [subCategorySchema],
})

const Category = mongoose.model('Categories', categorySchema);


// <<<Add>>> Work Well
router.post('/addCategory', async (req, res) => {

    let category = new Category({ 
        englishNameCategory: req.body.englishNameCategory, 
        arabicNameCategory: req.body.arabicNameCategory,
    });

    await category.save();
    res.send(category);
})


// <<<Add>>> Work Well
router.post('/addSubCategory', async(req, res) => {
    
    let subCategory = new SubCategory ({
        englishNameSubCategory: req.body.englishNameSubCategory,
        arabicNameSubCategory: req.body.arabicNameSubCategory,
        parentId: req.body.parentId
    });

    // Get Main Category
    let category = await Category.findById(subCategory.parentId);
    
    if (!category) {
        res.status(400).send("Category Id Does not exits")
        return;
    }
    

    // else Push it in category with given Id
    category.subCategory.push(subCategory);
    category.save();
    subCategory.save();
    res.send(subCategory);
    res.send("Added Successfully...");
})

// <<<Add>>> Work Well
router.post('/AddProduct', async(req, res) => {

    const product = new Product({   
        englishNameProduct: req.body.englishNameProduct,
        arabicNameProduct: req.body.arabicNameProduct,
        englishDescriptionProduct: req.body.englishDescriptionProduct,
        arabicDescriptionProduct: req.body.arabicDescriptionProduct,
        price: req.body.price,
        totalQuantity: req.body.totalQuantity,
        isWholesale: req.body.isWholesale,
        parentId: req.body.parentId
    })

    let category = await Category.find();

    var mainCategoryId;
    var index;
    
    // Loop In Main Category
    category.forEach(loop => {

        // Loop In Sub Categories in Main Category 
        loop.subCategory.forEach(subLoop => {

            // Get Id of Main Category 
            if (subLoop._id == product.parentId) {
                mainCategoryId = subLoop.parentId; 
                index = loop.subCategory.indexOf(subLoop)
            }
        })
    })

    let mainCategory = await Category.findById(mainCategoryId);
    if (index > -1) mainCategory.subCategory[index].products.push(product);
    else res.send("Sub category has not found!");

    mainCategory.save()
    product.save();
    
    res.send("Added Successfully")
})


// <<<UpdateCategory>>> Work Well 
router.put('/updateCategory/:id', async(req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    res.send({
        message: `The Category With id ${req.params.id} was Updated Successfully!`
    })
})

// <<<UpdateSubCategory>>> Work Well 
router.put('/updateSubCategory/:id', async(req, res) => {
    let subCategory = await SubCategory.findById(req.params.id);
    
    let category = await Category.findById(subCategory.parentId);
    
    let index = category.subCategory.findIndex(x => x._id == req.params.id);
    
    if (index > -1) {
        category.subCategory[index].englishNameSubCategory = req.body.englishNameSubCategory;
        category.subCategory[index].arabicNameSubCategory = req.body.arabicNameSubCategory;
    }
    
    await category.save();
    await SubCategory.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    
    res.send({
        message: `The Category With id ${req.params.id} was Updated Successfully!`
    })
})


// <<<UpdateProduct>>> Work Well 
router.put('/UpdateProduct/:id', async(req, res) => {
    let product = await Product.findById(req.params.id);
    
    console.log("Sub Category Id is: "+ product.parentId);
    
    let category = await Category.find();


    var mainCategoryId;
    var index;
    
    // Loop In Main Category
    category.forEach(loop => {

        // Loop In Sub Categories in Main Category 
        loop.subCategory.forEach(subLoop => {

            // Get Id of Main Category 
            if (subLoop._id == product.parentId) {
                mainCategoryId = subLoop.parentId; 
                index = loop.subCategory.indexOf(subLoop)
            }
        })
    })

    let mainCategory = await Category.findById(mainCategoryId);
    if (index > -1) {

        let productIndex = mainCategory.subCategory[index].products.findIndex(x => x.id == req.params.id);

        console.log(productIndex);
        
        if (productIndex > -1) {

            mainCategory.subCategory[index].products[productIndex].englishNameProduct = req.body.englishNameProduct;
            mainCategory.subCategory[index].products[productIndex].arabicNameProduct = req.body.arabicNameProduct;
            mainCategory.subCategory[index].products[productIndex].englishDescriptionProduct = req.body.englishDescriptionProduct;
            mainCategory.subCategory[index].products[productIndex].arabicDescriptionProduct = req.body.arabicDescriptionProduct;
            mainCategory.subCategory[index].products[productIndex].price = req.body.price;
            mainCategory.subCategory[index].products[productIndex].totalQuantity = req.body.totalQuantity;
            mainCategory.subCategory[index].products[productIndex].isWholesale = req.body.isWholesale;
        }
    }
    else res.send("Sub category has not found!");

    mainCategory.save();
    await Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    
    res.send("Update Successfully")
});

    
// <<<Delete API>>> Work Well
router.delete('/DeleteCategory/:id', async(req, res) => {
    await Category.findByIdAndRemove(req.params.id);
    res.send({
        message: "Category has been Deleted!",
    });
});


// <<<Delete SubCategory API>>> Work Well
router.delete('/DeleteSubCategory/:id', async(req, res) => {
    
    // Here will Be Code To Delete SubCategory From Category
    let subCategory = await SubCategory.findById(req.params.id);
    
    let category = await Category.findById(subCategory.parentId);
    
    let index = category.subCategory.findIndex(x => x._id == req.params.id);
    
    if (index > -1) category.subCategory.splice(index, 1);

    console.log(index);
    
    await category.save();

    // This Code To Delete SubCategory form SubCategory Database
    await SubCategory.findByIdAndRemove(req.params.id);

    res.send({
        message: "Category has been Deleted!",
    });
});


// <<<Delete Product API>>> Work Well
router.delete('/DeleteProduct/:id', async(req, res) => {
    
    // Here Will Be Code To Delete Product From SubCategory
    let product = await Product.findById(req.params.id);

    console.log(product);

    if (!product) {
        return
    }
    
    
    console.log("Sub Category Id is: "+ product.parentId);
    
    let category = await Category.find();


    var mainCategoryId;
    var index;
    
    // Loop In Main Category
    category.forEach(loop => {

        // Loop In Sub Categories in Main Category 
        loop.subCategory.forEach(subLoop => {

            // Get Id of Main Category 
            if (subLoop._id == product.parentId) {
                mainCategoryId = subLoop.parentId; 
                index = loop.subCategory.indexOf(subLoop)
            }
        })
    })

    console.log("Index = ", index);

    let mainCategory = await Category.findById(mainCategoryId);
    if (index > -1) {

        let productIndex = mainCategory.subCategory[index].products.findIndex(x => x.id == req.params.id);

        console.log("productIndex = " ,productIndex);
        
        if (productIndex > -1) {
            mainCategory.subCategory[index].products.splice(productIndex, 1);
            console.log("The Product Will Be Deleted is = ", mainCategory.subCategory[index].products[productIndex]);
        }
    }
    else res.send("Sub category has not found!");

    mainCategory.save();
    
    await Product.findByIdAndRemove(req.params.id);
    res.send({
        message: "Category has been Deleted!",
    });
});


// <<<DeleteAll>> Works Well
router.delete('/deleteAll', async(req, res) => {
    await Category.deleteMany();
    res.send("Delete All DataBase Successfully")
})

// <<<LISTCategory>>> Work Well
router.get('/ListCategories', async (req, res) => {
    let categories = await Category.find()
    res.send(categories)    
});

// <<<SubCategoryLIST>>> Work Well
router.get('/ListSubCategories', async (req, res) => {
    let subCategories = await SubCategory.find()
    res.send(subCategories)    
});

// <<<ProductLIST>>> Work Well
router.get('/ListProducts', async (req, res) => {
    let products = await Product.find()
    res.send(products)    
});

// <<<Category GetById>>>  Work Well
router.get('/getCategoryById/:id', async (req, res) => {
    let category = await Category.findById(req.params.id);
    res.send(category)
})

// <<<SubCategory GetById>>>  Work Well
router.get('/getSubCategoryById/:id', async (req, res) => {
    let subCategory = await SubCategory.findById(req.params.id);
    res.send(subCategory)
})

// <<<Product GetById>>>  Work Well
router.get('/GetProductById/:id', async (req, res) => {
    let product = await Product.findById(req.params.id);
    res.send(product)
})


module.exports = router;




















