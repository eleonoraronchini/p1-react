import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import Loading from "./Loading";
import Error from "./Error";
import FilmGallery from "./FilmGallery";

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [arrayOfMovie, setArrayOfMovie] = useState({
    movie1: [],
    movie2: [],
    movie3: [],
  });

  function timerError() {
    setHasError(true);
    setTimeout(() => {
      setHasError(false);
    }, 2500);
  }

  async function fetchMovie(movie, setLocal) {
    try {
      const response = await fetch(`http://www.omdbapi.com/?s=${movie}&apikey=1bd70c73`);

      if (response.ok) {
        const arrayMovieObj = await response.json();
        console.log(arrayMovieObj.Search);
        if (arrayMovieObj.Search) {
          setArrayOfMovie((prevState) => ({ ...prevState, [setLocal]: arrayMovieObj.Search }));
        } else {
          setHasError("No movies found");
        }
      } else {
        setHasError("Error during the request");
        throw new Error(`Errore : ${response.statusText}`);
      }
    } catch (error) {
      timerError();
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Fetching movies...");
    fetchMovie("harry potter", "movie1");
    fetchMovie("evangelion", "movie2");
    fetchMovie("american pie", "movie3");
  }, []);

  return (
    <main>
      <Container id="filter" className="mb-5">
        <Row className="justify-content-between align-items-center">
          <Col>
            <div className="d-flex align-items-center">
              <h2 className="text-white pe-md-3 pe-1">TV Shows</h2>
              <Dropdown>
                <Dropdown.Toggle
                  className="btn btn-dark border-white rounded-0"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu className="rounded-0">
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Col>
            <div className="d-flex justify-content-end align-items-center h-100">
              <div className="btn-group" role="group" aria-label="Basic example" data-bs-theme="dark">
                <Button type="button" className="btn btn-primary btn-darkgray border rounded-0 fs-5 btn-outline-light bg-dark">
                  <i className="bi bi-list"></i>
                </Button>
                <Button type="button" className="btn btn-primary btn-darkgray border rounded-0 fs-5 btn-outline-light bg-dark">
                  <i className="bi bi-grid-fill"></i>
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {isLoading && <Loading />}
        {hasError && <Error color="danger" error="ERRORE DURANTE IL CARICAMENTO" />}

       
        <FilmGallery movieList={arrayOfMovie.movie1} id="movie-gallery-1" title="Harry Potter Movies" />
        <FilmGallery movieList={arrayOfMovie.movie2} id="movie-gallery-2" title="Neon Genesis Evangelion" />
        <FilmGallery movieList={arrayOfMovie.movie3} id="movie-gallery-3" title="American Pie Movies" />
      </Container>
    </main>
  );
}

export default Main;