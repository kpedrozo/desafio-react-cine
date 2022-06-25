import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import MovieBox from "./components/MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=f6fdf6c0972c398b271a5117d2c3edd8&sort_by=popularity.desc";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=f6fdf6c0972c398b271a5117d2c3edd8&query";
const API_VOTE =
  "https://api.themoviedb.org/3/discover/movie?api_key=f6fdf6c0972c398b271a5117d2c3edd8&language=en-US&sort_by=popularity.desc&vote_average.lte";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Buscando");
    try {
      const url = API_SEARCH+'='+query;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const ratingChanged = async (newRating) => {
    newRating = newRating * 2;
    let newRatingGte = newRating - 2;
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=f6fdf6c0972c398b271a5117d2c3edd8&language=en-US&sort_by=popularity.desc&vote_average.gte=${newRatingGte}&vote_average.lte=${newRating}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.log(newRating);
    }
  };

  return (
    <Fragment>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Movie App</Navbar.Brand>
          <Navbar.Brand href="/home">Destacados</Navbar.Brand>
          <Navbar.Brand className="rating">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={searchMovie}>
              <FormControl
                type="search"
                placeholder="Buscar pelicula"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Buscar
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movie) => (
                <MovieBox key={movie.id} {...movie} />
              ))}
            </div>
          </div>
        ) : (
          <h2>No se encontraron películas, intenta con otra palabra</h2>
        )}
      </div>
    </Fragment>
  );
}

export default App;
