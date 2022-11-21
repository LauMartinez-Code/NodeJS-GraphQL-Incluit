const express = require('express');
const app = express();
const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost:27017/products');
    
    mongoose.connection.once('open', () => console.log('DB connected'));
    
    const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        price: Number
    });
    
    const Product = mongoose.model('Product', ProductSchema);
    
    //Run this code once to fill the DB with some data. Then delete it or comment it again
    // const productsJSON = require('./products.json');
    // productsJSON.products.forEach(e => {
    //     new Product(e).save()
    //     .catch(error => console.error(`Something went wrong saving ${e}`, error));
    // });

    app.use(async (req, res, next) => {
        if (req.query.title) {
            const filteredProducts = await Product.find({ title: new RegExp(`${req.query.title}+`,"i")});

            if (filteredProducts.length > 0) {
                return res.status(200).json(filteredProducts);
            } else {
                return res.status(404).json({ message : 'No products found.' });
            }
        }
    
        next();
    });
    
    app.get('/products', async (req, res) => {
        res.status(200).json(await Product.find());
    });
    
    app.listen(3000, () => console.log('API listening on http://localhost:3000/products'));

} catch (error) {
    console.error(error);
}

