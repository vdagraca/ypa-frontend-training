import fetch from 'isomorphic-unfetch'
import qs from 'qs'

const API_KEY = '149a733ca73a71f9233c239e0607f92d'

const jsonMimeType = 'application/json'

export const acceptJson = {
  Accept: jsonMimeType,
}

export const postJson = {
  'Content-Type': jsonMimeType,
}

export const makeUrl = (endpoint, apiKey, params) => {
  const queryParams = qs.stringify({ api_key: apiKey, ...params })
  return `https://api.themoviedb.org/3/${endpoint}?${queryParams}`
}

// example url: https://api.themoviedb.org/3/discover/movie?api_key=149a733ca73a71f9233c239e0607f92d&sort_by=ascending
export async function getMovies(sortBy = 'ascending') {
  const apiUrl = makeUrl('discover/movie', API_KEY, { sort_by: sortBy })

  const result = await fetch(apiUrl, {
    method: 'GET',
    ...acceptJson,
  })

  if (!result.ok) {
    console.error('Failed to fetch movies ', result)
    return
  }

  return await result.json()
}

// example url: https://api.themoviedb.org/3/search/movie?api_key=149a733ca73a71f9233c239e0607f92d&query=Avengers
export async function searchMovies(query) {
  // construct the correct url
  const apiUrl = makeUrl()

  // Fetch movies like above ^
}
