import axios from 'axios';

const myApiKey = process.env.REACT_APP_THEMOVIEDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

!myApiKey && console.error('No TheMovieDb API key found! Make sure a .env file with REACT_APP_THEMOVIEDB_API_KEY=<YOUR API KEY HERE> exists!');

/**
 * @param {string} endpoint 
 * @param {Object} params 
 */
const buildUrl = (endpoint, params) => {
  let url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}?api_key=${myApiKey}`;

  for (let key in params) {
    url += `&${key}=${params[key]}`;
  }
  return url;
}

export default class TheMovieDbApiService {
  /**
   * Search endpoint
   * https://developers.themoviedb.org/3/search/
   * GET /search/:type
   * @param {string} type movie or tv
   * @param {Object} params at least { query: string } required
   * @return {Object} { page: number, results: Array<Object> }
   */
  static async search(type, params) {
    // `${baseUrl}/search/${type}?api_key=${myApiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    const include_adult = params.include_adult ? params.include_adult : false;
    const apiUrl = buildUrl(`/search/${type}`, { ...params, include_adult });
    const result = await axios.get(apiUrl);

    if (result.success && result.success === "false") {
      console.error(`/search/${type}\n${result.data.status_message}`);
    }
    return result.data;
  }

  /**
   * Movies and TV details endpoint
   * https://developers.themoviedb.org/3/movies/
   * https://developers.themoviedb.org/3/tv
   * GET /:type/:id
   * @param {string} type movie or tv
   * @param {string|number} id movie or tv identifier
   * @param {Object} params optional
   * @return {Object}
   */
  static async getDetails(type, id, params) {
    const apiUrl = buildUrl(`/${type}/${id}`, params);
    const result = await axios.get(apiUrl);

    if (result.success && result.success === "false") {
      console.error(`/${type}/${id}/\n${result.data.status_message}`);
    }
      return result.data;
  }

  /**
   * Movies and TV YouTube videos endpoint
   * https://developers.themoviedb.org/3/movies/get-movie-videos
   * @param {string} type movie or tv
   * @param {string|number} id movie or tv identifier
   * @param {Object} params optional
   * @return {Object} { id: number, results: Array<Object> }
   */
  static async getVideos(type, id, params) {
    const apiUrl = buildUrl(`/${type}/${id}/videos`, params);
    const result = await axios.get(apiUrl);

    if (result.success && result.success === "false") {
      console.error(`/${type}/${id}/videos\n${result.data.status_message}`);
    }
      return result.data;
  }
}
