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
}

export function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {}, [])

  return (
    <Container>
      <h1>My Movies</h1>
      <List></List>
    </Container>
  )
}
