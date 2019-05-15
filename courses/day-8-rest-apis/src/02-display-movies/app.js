import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import * as ApiClient from './api-client'
import './app.css'

function Container({ children }) {
  return <div className="container">{children}</div>
}

function List({ children }) {
  return <ul className="movie-list">{children}</ul>
}

function Image({ src, alt = '' }) {
  return <img src={src} alt={alt} />
}

export function ListItem({ movie }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li
      className={classnames('movie-item', {
        _is_expanded: expanded,
      })}
      onClick={() => setExpanded(!expanded)}
    >
      <Image src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <div className="movie-item__content">
        <p>{movie.overview}</p>
        <span>
          Rating: <strong>{movie.vote_average} / 10</strong> ({movie.vote_count} votes)
        </span>
      </div>
    </li>
  )
}

export function App() {
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    const { results } = await ApiClient.getMovies('popularity.desc')
    if (results && results.length) {
      setMovies(results)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <Container>
      <h1>My Movies</h1>
      <List>{movies.map((movie) => <ListItem key={movie.id} movie={movie} />)}</List>
    </Container>
  )
}
