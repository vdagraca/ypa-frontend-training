import React, { useState, useEffect } from 'react'
import * as ApiClient from './api-client'
import './app.css'

function Container({ children }) {
  return <div className="container">{children}</div>
}

function List({ children }) {

  return <ul className="movie-list">{children}</ul>
}


export function ListItem({ movie }) {

  const [expanded, setExpanded] = useState(false)
  console.log('expanded', expanded)

  return <li className="list-item" onClick={() => setExpanded(!expanded)}>
    <h3>{movie.title}</h3>
    <img className="item-image" src={"https://image.tmdb.org/t/p/w185/" + movie.backdrop_path} alt="movie poster" />
    <p className={`movie-item${expanded ? '_is_expanded' : ''}`}>
      {movie.overview}
    </p>
  </li>
}

export function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function fetchMovies() {
      const { results } = await ApiClient.getMovies('popularity.desc')
      if (results && results.length) {
        setMovies(results)
      }
    }
    fetchMovies()
  }, [])



  // Query  change
  const searchMovies = async () => {
    setIsLoading(true)

    const { results } = await ApiClient.searchMovies(query)

    if (results) {
      setMovies(results)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    // TODO
  }, [query])

  return (
    <Container className="container">
      <h1>My Movies</h1>
      <div className="seachbar">
        <form>
          <input
            type="text"
            placeholder="Search movies"
            onChange={(e) => setQuery(e.target.value)} />
        </form>
        <button onClick={() => searchMovies()}>
          Search
        </button>
      </div>
      <List>
        {movies.map((movie) => <ListItem key={movie.id} movie={movie}></ListItem>)}
      </List>
    </Container>
  )
}
