const { ApolloServer, gql } = require("apollo-server");
const MovieSchema = require('./schema/movies');
const SeriesSchema = require('./schema/series');

const typeDefs = gql`
    type Response {
        message: String
    }

    type Query
    
    type Mutation
`

const formatError = (err) => {
    if (err.message.startsWith('Database Error: ')) {
      return new Error('Internal server error');
    } else if (err.message.startsWith('Request failed with status code 404')) {
        return new Error('Movie or Series Data Not Found')
    }
    return err;
}

const server = new ApolloServer({
    typeDefs: [typeDefs, MovieSchema.typeDefs, SeriesSchema.typeDefs],
    resolvers: [MovieSchema.resolvers, SeriesSchema.resolvers],
    formatError });

server.listen().then(({ url }) => {
    console.log(`🚀 Entertain Me Server ready at ${url}`);
});
