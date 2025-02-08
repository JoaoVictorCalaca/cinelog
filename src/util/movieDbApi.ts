import axios from 'axios'

const api_key = ''
const baseURL = 'https://api.themoviedb.org/3'

//Pesquisar filmes com base na query
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

//buscar filme por id
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

//retorna o trailer do filme com base no seu id
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

// retorna uma lista dos filmes mais populares da semana
export const getPopularMovies = async (page: number) => {
  try {
    const resp = await axios.get(`${baseURL}/trending/movie/week`, {
      params: {
        api_key: api_key,
        language: 'pt-BR',
        page
      }
    })

    return resp.data ?? { results: [], total_pages: 1 };    
  } catch (e) {
    console.log(`Error in the fetch: ${e}`);
    return []
  }
}

// retorna uma lista de filmes que estão em cartaz
export const getNowPlayingMovies = async () => {
  try {
    const resp = await axios.get(`${baseURL}/movie/now_playing`, {
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

//retorna uma lista dos filmes mais bem avaliados da api
export const getBestRatedMovies = async () => {
  try {
    const resp = await axios.get(`${baseURL}/movie/top_rated`, {
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

//retorna uma lista de filmes que serão lançados em breve
export const getUpcomingMovies = async () => {
  try {
    const resp = await axios.get(`${baseURL}/movie/upcoming`, {
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

//exibe os provedores onde o filme esta disponível
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
    return []
  }
}

export const getSimilarMovies = async (movieId: string) => {
  try {
    const resp = await axios.get(`${baseURL}/movie/${movieId}/similar`, {
      params: {
        api_key: api_key,
        language: 'pt-BR'
      }
    })

    return resp.data.results || null
  } catch (e) {
    console.error(`Error in the fetch ${e}`);
    return []
  }
}
