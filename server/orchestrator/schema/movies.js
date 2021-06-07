const { gql } = require("apollo-server");
const axios = require("axios");

const movieServiceURL = "http://34.227.53.241:4001/movies";

const Redis = require("ioredis")
const redis = new Redis()

const redisMovieKey = 'movieData'

const typeDefs = gql`
    type Movie {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        movies: [Movie]
        findMovie(id: ID): Movie
    }

    extend type Mutation {
        addMovie(newMovie: MovieInput): Movie
        editMovie(id: ID, newData: MovieInput): Movie
        deleteMovie(id: ID): Response
    }

    input MovieInput {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

`;

const resolvers = {
    Query: {
        movies: async () => {
            try {
                const result = await redis.get(redisMovieKey)
                if (!result) {
                    const { data } = await axios({ url: movieServiceURL })
                    redis.set(redisMovieKey, JSON.stringify(data))
                    return data
                } else {
                    return JSON.parse(result)
                }
            } catch (err) {
                throw err
            }
        },
        findMovie: (_, args) => {
            return axios({
                url: `${movieServiceURL}/${args.id}`,
            })
                .then(({ data }) => {
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
    },
    Mutation: {
        addMovie: (_, args) => {
            const newMovie = {
                title: args.newMovie.title,
                overview: args.newMovie.overview,
                poster_path: args.newMovie.poster_path,
                popularity: args.newMovie.popularity,
                tags: args.newMovie.tags,
            };
            return axios({
                url: movieServiceURL,
                method: "POST",
                data: newMovie,
            })
                .then(({ data }) => {
                    redis.del(redisMovieKey)
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        editMovie: (_, args) => {
            const _id = args.id;
            const newData = {
                title: args.newData.title,
                overview: args.newData.overview,
                poster_path: args.newData.poster_path,
                popularity: args.newData.popularity,
                tags: args.newData.tags,
            };
            return axios({
                url: `${movieServiceURL}/${_id}`,
                method: "PUT",
                data: newData,
            })
                .then(({ data }) => {
                    redis.del(redisMovieKey)
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        deleteMovie: (_, args) => {
            const _id = args.id;
            return axios({
                url: `${movieServiceURL}/${_id}`,
                method: "DELETE",
            })
                .then(({ data }) => {
                    redis.del(redisMovieKey)
                    return { message: data.message }
                })
                .catch((err) => {
                    throw err;
                });
        },
    },
};

module.exports = {
    typeDefs,
    resolvers
}