import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieCounter, setCounter] = useState([])

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data)
        setCounter(res.data.length)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [movieCounter]);

  const deleteFromList = () => {
    setCounter(movieCounter - 1)
  }


  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/update-movies/:id"
        render={() => <UpdateMovie getMovie={getMovieList} />}
      />

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMov={deleteFromList} />
      </Route>
    </>
  );
};

export default App;