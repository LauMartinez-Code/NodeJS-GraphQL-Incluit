import { GraphQLError } from 'graphql';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { Product } from '../DB/Product.js';

const typeDefs = loadSchemaSync('./models/GraphQL/Schema.graphql', { loaders: [new GraphQLFileLoader()] });

const resolvers = {
    Search: {
        __resolveType(object) {
            
            if(object.email) {
                return 'User';
            }
            else if(object.price) {
                return 'Product';
            }

            return null;
        }
    },
    Query: {
        getProductById: async (_, param) => {
            const filteredProduct = await Product.findById(param.id);
            
            if (filteredProduct)
                return filteredProduct;
            else
                throw new GraphQLError('HTTP 404. Product not found.', { extensions: { code: '404' } });
            
        },
        getProductsByTitle: async (_, param) => {
            const filteredProducts = await Product.find({ title: new RegExp(`${param.title}+`,"i")});
            
            if (filteredProducts.length > 0)
                return filteredProducts;
        },
        getAllproducts: async () => await Product.find(),
        search: async (_, param) => {
            //Do some searches using param.term...
            //retruns diferent types of objects defined GQL Schema
            return [
                {
                    "_id": "63a8eb118d14113ec9962f10",
                    "title": "Samsung Universe 9",
                    "price": 1249
                },
                {
                    "_id": "a8eb118d14113ec932962f14",
                    "name": "Jess",
                    "email": "example@example.com",
                    "role_id": 1
                }
            ];
        }
    },
    
    Mutation: {
        addProduct: async (_, param) => await Product.create(param.body),
    
        updateProductPrice: async (_, params) => {
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
        deleteProduct: async (_, param) => {
            const query = await Product.deleteOne({ _id: param?.id });
            console.log(`${query.deletedCount} product${query.deletedCount == 1 ? ' was' : 's were'} deleted`);
    
            return query.deletedCount > 0;
        },
    },
};

export { typeDefs, resolvers };