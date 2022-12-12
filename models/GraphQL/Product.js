const { GraphQLError } = require('graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { Product } = require('../DB/Product');

const graphqlSchema = loadSchemaSync('./models/GraphQL/Schema.graphql', { loaders: [new GraphQLFileLoader()] });

const resolvers = {
    //#region Queries
    getProductById: async (param) => {
        const filteredProduct = await Product.findById(param.id);
        
        if (filteredProduct)
            return filteredProduct;
        else
            throw new GraphQLError('HTTP 404. Product not found.', { extensions: { code: '404' } });
        
    },
    getProductsByTitle: async (param) => {
        const filteredProducts = await Product.find({ title: new RegExp(`${param.title}+`,"i")});
        
        if (filteredProducts.length > 0)
            return filteredProducts;
    },
    getAllproducts: async () => await Product.find(),
    //#endregion
    
    //#region Mutations
    addProduct: async (param) => await Product.create(param.body),

    updateProductPrice: async (params) => {
        const { id, price } = params;

        if (id && price) {
            const updatedProduct = await Product.findByIdAndUpdate(id, { price: price }, { returnDocument: 'after' });
            
            if (updatedProduct) {
                return updatedProduct;
            } else {
                throw new GraphQLError('HTTP 404. Product not found.', { extensions: { code: '404' } });
            }
        } else{
            throw new GraphQLError('HTTP 400. Bad request.', { extensions: { code: '400' } });
        }

    },
    deleteProduct: async (param) => {
        const query = await Product.deleteOne({ _id: param?.id });
        console.log(`${query.deletedCount} product${query.deletedCount == 1 ? ' was' : 's were'} deleted`);

        return query.deletedCount > 0;
    },
    //#endregion
};

module.exports = { graphqlSchema, resolvers };