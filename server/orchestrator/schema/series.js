const { gql } = require("apollo-server");
const axios = require("axios");

const seriesServiceURL = "http://3.84.98.106:4002/series";

const Redis = require("ioredis")
const redis = new Redis()

const redisSeriesKey = 'seriesData'

const typeDefs = gql`

    type Series {
        _id: ID
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }

    extend type Query {
        series: [Series]
        findSeries(id: ID): Series
    }

    extend type Mutation {
        addSeries(newSeries: SeriesInput): Series
        editSeries(id: ID, newData: SeriesInput): Series
        deleteSeries(id: ID): Response
    }

    input SeriesInput {
        title: String
        overview: String
        poster_path: String
        popularity: Float
        tags: [String]
    }
`;

const resolvers = {
    Query: {
        series: async () => {
            try {
                const result = await redis.get(redisSeriesKey)
                if (!result) {
                    const { data } = await axios({ url: seriesServiceURL })
                    redis.set(redisSeriesKey, JSON.stringify(data))
                    return data
                } else {
                    return JSON.parse(result)
                }
            } catch (err) {
                throw err
            }
        },
        findSeries: (_, args) => {
            return axios({
                url: `${seriesServiceURL}/${args.id}`,
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
        addSeries: (_, args) => {
            const newSeries = {
                title: args.newSeries.title,
                overview: args.newSeries.overview,
                poster_path: args.newSeries.poster_path,
                popularity: args.newSeries.popularity,
                tags: args.newSeries.tags,
            };
            return axios({
                url: seriesServiceURL,
                method: "POST",
                data: newSeries,
            })
                .then(({ data }) => {
                    redis.del(redisSeriesKey)
                    return data
                })
                .catch((err) => {
                    throw err;
                });
        },
        editSeries: (_, args) => {
            const _id = args.id;
            const newData = {
                title: args.newData.title,
                overview: args.newData.overview,
                poster_path: args.newData.poster_path,
                popularity: args.newData.popularity,
                tags: args.newData.tags,
            };
            return axios({
                url: `${seriesServiceURL}/${_id}`,
                method: "PUT",
                data: newData,
            })
                .then(({ data }) => {
                    redis.del(redisSeriesKey)
                    return data;
                })
                .catch((err) => {
                    throw err;
                });
        },
        deleteSeries: (_, args) => {
            const _id = args.id;
            return axios({
                url: `${seriesServiceURL}/${_id}`,
                method: "DELETE",
            })
                .then(({ data }) => {
                    redis.del(redisSeriesKey)
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