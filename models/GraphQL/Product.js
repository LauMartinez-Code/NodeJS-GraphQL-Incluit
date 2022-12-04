const { GraphQLError } = require('graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { Product } = require('../DB/Product');

let graphqlSchema = loadSchemaSync('./models/GraphQL/Schema.graphql', { loaders: [new GraphQLFileLoader()] });

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

module.exports = { graphqlSchema, resolvers };