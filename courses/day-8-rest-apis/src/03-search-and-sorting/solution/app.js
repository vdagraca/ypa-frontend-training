import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useDebounce } from 'use-debounce'
import * as ApiClient from './api-client'
import './app.css'

function Container({ children }) {
  return <div className="container">{children}</div>
}

function List({ children }) {
  return <ul className="movie-list">{children}</ul>
}

function Image({ path, alt = '' }) {
  return <img src={path} alt={alt} />
}

export function ListItem({ movie }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li
      className={classnames('movie-item', { _is_expanded: expanded })}
      onClick={() => setExpanded(!expanded)}
      role="button"
    >
      {movie.backdrop_path && (
        <Image path={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
      )}
      <h3>{movie.title}</h3>
      <div className="movie-item__content">
        <p>{movie.overview}</p>
        <span>
          Rating: <strong>{movie.vote_average} / 10</strong> ({movie.vote_count} ratings)
        </span>
      </div>
    </li>
  )
}

export function App() {
  const [movies, setMovies] = useState([])
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)

  const fetchMovies = async (sortBy = 'popularity.desc') => {
    const { results } = await ApiClient.getMovies(sortBy)
    if (results && results.length) {
      setMovies(results)
    }
  }

  const searchMovies = async (query, sortBy) => {
    const { results } = await ApiClient.searchMovies(query, sortBy)
    if (results) {
      setMovies(results)
    }
  }

  // Mount
  useEffect(() => {
    fetchMovies()
  }, [])

  // Query change
  useEffect(
    () => {
      if (debouncedQuery !== '') {
        console.log(sortBy)
        searchMovies(debouncedQuery, sortBy)
      } else {
        fetchMovies() // restore original movies
      }
    },
    [debouncedQuery, sortBy]
  )

  return (
    <Container>
      <h1>My Movies</h1>
      <input
        type="search"
        className="movie-search-input"
        placeholder="Search for movies"
        onChange={(e) => setQuery(e.target.value)}
      />
      {debouncedQuery !== '' &&
        movies.length !== 0 && (
          <div className="movie-search-info">
            <span className="movie-search-label">Search results for: <strong>"{debouncedQuery}"</strong></span>

            <select name="sort-by" id="sort-by" onChange={(e) => setSortBy(e.target.value)}>
              <option value="popularity.desc">Most popular</option>
              <option value="popularity.asc">Least popular</option>
            </select>
          </div>
        )}
      {movies.length === 0 && (
        <div className="movie-search-no-results">
          <h3>No results found for: {debouncedQuery}</h3>
        </div>
      )}
      <List>{movies.map((movie) => <ListItem key={movie.id} movie={movie} />)}</List>
    </Container>
  )
}
