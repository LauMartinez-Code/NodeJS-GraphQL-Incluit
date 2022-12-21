import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs, resolvers } from './models/GraphQL/Product.js';
import mongoose from 'mongoose';

try {
    
    mongoose.connect('mongodb://localhost:27017/products');
    mongoose.connection.once('open', () => console.log('DB connected'));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
      
    console.log(`🚀 Server ready at: ${url}`);

} catch (error) {
    console.error(error);
}