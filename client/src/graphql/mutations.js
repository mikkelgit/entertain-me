import { gql } from '@apollo/client'

export const REMOVE_MOVIE = gql`
    mutation removeMovie($id: ID) {
        deleteMovie(id: $id) {
            message
        }
    }
`

export const REMOVE_SERIES = gql`
    mutation removeSeries($id: ID) {
        deleteSeries(id: $id) {
            message
        }
    }
`

export const ADD_MOVIE = gql`
    mutation createMovie($dataInput: MovieInput) {
        addMovie(newMovie: $dataInput) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const ADD_SERIES = gql`
    mutation createSeries($dataInput: SeriesInput) {
        addSeries(newSeries: $dataInput) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const EDIT_MOVIE = gql`
    mutation editMovieData($id: ID, $dataInput: MovieInput) {
        editMovie(id: $id, newData: $dataInput) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const EDIT_SERIES = gql`
    mutation editSeriesData($id: ID, $dataInput: SeriesInput) {
        editSeries(id: $id, newData: $dataInput) {
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`