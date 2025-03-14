import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPreparedMovie(query, movies) {
  let preparedMovie = [...movies];
  const queryToLowCase = query.toLowerCase().trim();

  if (query) {
    preparedMovie = preparedMovie.filter((movi) => {
      const moviTitle = movi.title.toLowerCase();
      const moviDesc = movi.description.toLowerCase();

      return moviTitle.includes(queryToLowCase)
      || moviDesc.includes(queryToLowCase);
    });
  }

  return preparedMovie;
}

export const App = () => {
  const [query, setQuery] = useState('');
  const visibleMovies = getPreparedMovie(query, moviesFromServer);

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};
