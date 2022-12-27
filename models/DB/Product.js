import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

//Run this code once to fill the DB with some data. Then delete it or comment it again
// import productsJSON from '../../data/Products.json' assert { type: "json" };
// Product.insertMany(productsJSON.products, (error, docs) => {
//     if (error) {
//         console.error('Something went wrong while saving data :(', error);
//     } else {
//         console.log(`${docs.length} documents added to DB`);
//     }
// });

export { Product };