const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphqlSchema, resolvers } = require('./models/GraphQL/Product');
const mongoose = require('mongoose');

try {
    const app = express();
    mongoose.connect('mongodb://localhost:27017/products');
    mongoose.connection.once('open', () => console.log('DB connected'));

    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: resolvers,
        graphiql: true,
    }));

    app.listen(3000, () => console.log('API listening on http://localhost:3000/graphql'));

} catch (error) {
    console.error(error);
}