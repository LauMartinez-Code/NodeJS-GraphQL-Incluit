const productsJSON = require('./products.json');
const express = require('express');
const app = express();

app.use((req, res, next) => {
    if (req.query.title) {
        const title = req.query.title.toLocaleLowerCase();
        const filteredProducts = productsJSON.products.filter(e => e.title.toLocaleLowerCase().includes(title));

        if (filteredProducts.length > 0) {
            return res.status(200).json(filteredProducts);
        } else {
            return res.status(404).json({ message : 'No products found.'});
        }
    }

    next();
});

app.get('/products', (req, res) => {
    res.status(200).json(productsJSON);
})

app.listen(3000, () => console.log('API listening on http://localhost:3000/products'));
