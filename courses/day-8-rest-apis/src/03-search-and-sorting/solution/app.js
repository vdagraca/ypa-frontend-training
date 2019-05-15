import React, { useState, useEffect } from 'react'
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
      className={`movie-item${expanded ? ' _is_expanded' : ''}`}
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
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)

  const fetchMovies = async (sortBy = 'popularity.desc') => {
    const { results } = await ApiClient.getMovies(sortBy)
    if (results && results.length) {
      setMovies(results)
    }
  }

  useEffect(
    () => {
      fetchMovies()
    },
    [debouncedQuery]
  )

  const searchMovies = async (query) => {
    const { results } = await ApiClient.searchMovies(query)
    if (results) {
      setMovies(results)
    }
  }

  useEffect(
    () => {
      if (debouncedQuery !== '') {
        searchMovies(debouncedQuery)
      }
    },
    [debouncedQuery]
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
      <div className="movie-search-info">
        {debouncedQuery !== '' && (
          <span className="movie-search-label">Search results for: {debouncedQuery}</span>
        )}
      </div>
      {movies.length === 0 && (
        <div className="movie-search-no-results">
          <h3>No results found for: {debouncedQuery}</h3>
        </div>
      )}
      <List>{movies.map((movie) => <ListItem key={movie.id} movie={movie} />)}</List>
    </Container>
  )
}
