import axios from 'axios'

const api_key = 'your api key'
const baseURL = 'https://api.themoviedb.org/3'

export const getMovies = async (movieTitle: string) => {
  try {
    const resp = await axios.get(`${baseURL}/search/movie`, {
      params: {
        api_key: api_key,
        query: movieTitle,
        language: 'pt-BR'
      }
    })

    return resp.data.results || []
  } catch (e) {
    console.log(`Error in the fetch: ${e}`);
    return []
  }
}

export const getMovieById = async (movieId: string) => {
  try {
    const resp = await axios.get(`${baseURL}/movie/${movieId}`, {
      params: {
        api_key: api_key,
        language: 'pt-BR'
      }
    })

    return resp.data || []
  } catch (e) {
    console.log(`Error in the fetch: ${e}`);
    return []
  }
}

export const getMovieTrailer = async (movieId: string) => {
  try {
    const resp = await axios.get(`${baseURL}/movie/${movieId}/videos`, {
      params: {
        api_key: api_key,
        language: 'pt-br'
      }
    })

    const videos: Video[] = resp.data.results

    const trailer = videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer')

    if (!trailer) {
      return;
    }

    return `https://www.youtube.com/watch?v=${trailer.key}`
  } catch (e) {
    console.error(`erro ao conseguir o trailer: ${e}`);

  }
}

export const getPopularMovies = async () => {
  try {
    const resp = await axios.get(`${baseURL}/movie/popular`, {
      params: {
        api_key: api_key,
        language: 'pt-BR'
      }
    })

    return resp.data.results || []
  } catch (e) {
    console.log(`Error in the fetch: ${e}`);
    return []
  }
}

export const getWatchProviders = async (movieId: string) => {
  try {
    const resp = await axios.get(`${baseURL}/movie/${movieId}/watch/providers`, {
      params: {
        api_key: api_key,
      }
    })

    return resp.data.results?.BR || null
  } catch (e) {
    console.error(`Error in the fetch: ${e}`);
    return[]
  }
}
