import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import Poster from "./Poster";

const FilmGallery = ({ movieList, id, title }) => {
  const isSm = useMediaQuery({ maxWidth: 767 });
  const isMd = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isXl = useMediaQuery({ minWidth: 1200 });
  const [maxSliderItem, setMaxSliderItem] = useState(3);

  // Impostiamo il numero massimo di elementi da mostrare per slide
  useEffect(() => {
    if (isXl) setMaxSliderItem(6);  // 6 per schermi extra large
    else if (isMd) setMaxSliderItem(4);  // 4 per tablet
    else if (isSm) setMaxSliderItem(3);  // 3 per mobile
  }, [isSm, isMd, isXl]);

  // Suddividiamo la lista di film in "gruppi" per il carosello
  const chunkedMovieList = [];
  for (let i = 0; i < movieList.length; i += maxSliderItem) {
    chunkedMovieList.push(movieList.slice(i, i + maxSliderItem));
  }

  return (
    <Container id={id} className="mb-5">
      <h3 className="text-white">{title}</h3>

      {/* Carosello di film */}
      <Carousel controls={true} indicators={false} interval={null}>
        {chunkedMovieList.map((chunk, index) => (
          <Carousel.Item key={index}>
            <Row className="gx-1">
              {chunk.map((movie, idx) => (
                <Col
                  key={idx}
                  className={
                    isSm
                      ? "col-4"
                      : isMd
                      ? "col-4 col-md-3"
                      : isXl
                      ? "col-4 col-md-3 col-xl-2"
                      : "col-4"
                  }
                >
                  <Poster poster={movie.Poster} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default FilmGallery;