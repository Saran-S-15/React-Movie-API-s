import React, { useEffect, useState } from 'react'
import Search from './components/Search';
import axios from 'axios';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';

const API_KEY = import.meta.env.VITE_x_rapidapi_key;
const API_HOST = import.meta.env.VITE_x_rapidapi_host;
const API_BASE_URL = 'https://imdb236.p.rapidapi.com/imdb'


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term to prevent making too many API Requests
  // by waiting for the user to stop typing for 500ms

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm])

  const fetchMovies = async (query) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const endpoint = query ? `${API_BASE_URL}/autocomplete` : `${API_BASE_URL}/most-popular-movies`
      const response = await axios.get(endpoint, {
        params: query ? { query } : {},
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST
        }
      });
      setMovieList(response.data);

    } catch (error) {
      console.error(error);
      setErrorMessage(`Error Fetching Movies. Please Try Again Later`)
    }
    finally {
      setIsLoading(false)
    }
  }


  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero" />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          {
            isLoading ? (
              <Spinner />
            ) : errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) : <ul>
              {
                movieList.map((movie) => {
                  return <MovieCard key={movie.id} movie={movie} />
                })
              }
            </ul>
          }
        </section>
      </div>
    </main>
  )
}

export default App;