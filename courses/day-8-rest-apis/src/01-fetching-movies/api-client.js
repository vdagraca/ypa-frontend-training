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
  const apiUrl = makeUrl()

  // Create the url with the fn above
  // Fetch the data
  // check if the response was OK
  // get the json body and return it
}
