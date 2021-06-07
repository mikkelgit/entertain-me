import { gql } from '@apollo/client'

export const GET_HOMEPAGE_DATA = gql`
    query getAll {
        movies {
            _id
            poster_path
        }
        series {
            _id
            poster_path
        }
    }
`

export const GET_MOVIES_DATA = gql`
    query getMovies {
        movies {
            _id
            poster_path
        }
    }
`

export const GET_SERIES_DATA = gql`
    query getSeries {
        series {
            _id
            poster_path
        }
    }
`

export const GET_MOVIE_DETAIL = gql`
    query getMovieById($id: ID) {
        findMovie(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_SERIES_DETAIL = gql`
    query getSeriesById($id: ID) {
        findSeries(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`