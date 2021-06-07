gql`
query getAll {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
}

query getMovies {
  movies {
    _id
  	title
    overview
    poster_path
    popularity
    tags
  }
}

query getMovieById {
  findMovie(id: "<id in string format>") {
    _id
  	title
    overview
    poster_path
    popularity
    tags
  }
}

mutation createMovie {
  addMovie(newMovie: {
    title: "Mortal Kombat",
    overview: "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg",
    popularity: 1,
    tags: ["Action", "Adventure", "Fantasy"]
  }) {
    _id
  	title
    overview
    poster_path
    popularity
    tags
  }
}

mutation editMovieData {
  editMovie(id: "<id in string format>", newData: {
    title: "Mortal Kombatssss",
    overview: "MMA fighter Cole Young seeks out Earth's greatest champions in order to stand against the enemies of Outworld in a high stakes battle for the universe.",
    poster_path: "https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_.jpg",
    popularity: 1,
    tags: ["Action", "Adventure", "Fantasy"]
  }) {
  	title
    overview
    poster_path
    popularity
    tags
  }
}

mutation removeMovie {
  deleteMovie(id: "<id in string format>") {
    message
  }
}
`