const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLError } = require('graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader  } = require('@graphql-tools/graphql-file-loader');
const mongoose = require('mongoose');

const app = express();

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

    let graphqlSchema = loadSchemaSync('./schema.graphql', { loaders: [new GraphQLFileLoader()] });

    const resolvers = {
        productById: async (param) => {
            
            if (param.id) {
                const filteredProduct = await Product.findById(param.id);
                
                if (filteredProduct) {
                    return filteredProduct;
                } else {
                    throw new GraphQLError('HTTP 404. Product not found.', { extensions: { code: '404' } });
                }
            }
        },
        productsByTitle: async (param) => {
            
            if (param.title) {
                const filteredProducts = await Product.find({ title: new RegExp(`${param.title}+`,"i")});
                
                if (filteredProducts.length > 0)
                    return filteredProducts;
            }

        },
        products: async () => await Product.find(),
    };

    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: resolvers,
        graphiql: true,
    }));

    app.listen(3000, () => console.log('API listening on http://localhost:3000/graphql'));

} catch (error) {
    console.error(error);
}