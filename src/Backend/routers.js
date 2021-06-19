const express = require('express');
const Category = require('./models/MainCategory')
const router = express.Router();

// Get All Categories 
router.get('/test', async(req, res) => {
    const categories = await Category.find()
	res.send(categories)
})

module.exports = router;