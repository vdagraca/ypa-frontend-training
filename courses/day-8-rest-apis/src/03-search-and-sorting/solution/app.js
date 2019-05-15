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

function Loader() {
  return <div className="loader" aria-hidden="true" />
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

function sortMovies(movies, key, direction = 'desc') {
  if (direction === 'desc') {
    return movies.sort((a, b) => (a[key] < b[key] ? -1 : 1))
  }
  if (direction === 'asc') {
    return movies.sort((a, b) => (a[key] < b[key] ? 1 : -1))
  }
  return movies
}

export function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [sortBy, setSortBy] = useState('none')
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)

  const fetchMovies = async (sortBy = 'popularity.desc') => {
    setIsLoading(true)

    const { results } = await ApiClient.getMovies(sortBy)
    if (results && results.length) {
      setMovies(results)
    }

    setIsLoading(false)
  }

  const searchMovies = async (query) => {
    setIsLoading(true)

    const { results } = await ApiClient.searchMovies(query, sortBy)
    if (results) {
      setMovies(results)
    }

    setIsLoading(false)
  }

  // Mount
  useEffect(() => {
    fetchMovies()
  }, [])

  // Query change
  useEffect(
    () => {
      if (debouncedQuery !== '') {
        searchMovies(debouncedQuery)
      } else {
        fetchMovies() // restore original movies
      }
    },
    [debouncedQuery]
  )

  // Sort by change
  useEffect(
    () => {
      setIsLoading(true)
      let sortedMovies = []

      switch (sortBy) {
        case 'popularity.desc':
          sortedMovies = sortMovies(movies, 'vote_average', 'desc')
          break
        case 'popularity.asc':
          sortedMovies = sortMovies(movies, 'vote_average', 'asc')
          break
        case 'new.desc':
          sortedMovies = sortMovies(movies, 'release_date', 'desc')
          break
        case 'new.asc':
          sortedMovies = sortMovies(movies, 'release_date', 'asc')
          break
        default:
          sortedMovies = movies
      }

      setMovies([])
      setMovies(sortedMovies)
      setIsLoading(false)
    },
    [sortBy]
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {debouncedQuery !== '' &&
            movies.length !== 0 && (
              <div className="movie-search-info">
                <span className="movie-search-label">
                  Search results for: <strong>"{debouncedQuery}"</strong>
                </span>

                <select
                  name="movies-sort-by"
                  className="movies-sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">Select sorting</option>
                  <option value="popularity.desc">Most popular</option>
                  <option value="popularity.asc">Least popular</option>
                  <option value="new.desc">Newest</option>
                  <option value="new.asc">Oldest</option>
                </select>
              </div>
            )}
          {movies.length === 0 && (
            <div className="movie-search-no-results">
              <h3>No results found for: {debouncedQuery}</h3>
            </div>
          )}
          <List>{movies.map((movie) => <ListItem key={movie.id} movie={movie} />)}</List>
        </>
      )}
    </Container>
  )
}
