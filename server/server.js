const express = require('express')
const { ApolloServer } = require('apollo-server-express');
// const path = require('path')

const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth')
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
    // create a new Apollo server and pass in our schemaData
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    // integrate our Apollo server with the Express application as middleware

    server.applyMiddleware({ app });

    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
}

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Now listening on localhost:${PORT}`);
})
});