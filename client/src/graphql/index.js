import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://3.84.108.222:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          series: {
            merge(existing, incoming) {
              return incoming
            }
          },
          movies: {
            merge(existing, incoming) {
              return incoming
            }
          }
        }
      }
    }
  })
})

export default client