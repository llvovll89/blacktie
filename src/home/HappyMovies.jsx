import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { Container } from '../styles/GlobalStyle';
import { SliderItem } from '../styles/Sliders';
import { useNavigate } from 'react-router-dom';
import { Loading, Spinner } from '../styles/Loading';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

const HappyMovies = ({ url }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const history = useNavigate();

  const dark = useSelector((state) => state.darkMode.dark);

  const [perPage, setPerPage] = useState(6);
  const [gap, setGap] = useState("6px");

  const {
    data: happyMovies,
    isLoading,
    error,
  } = useAxios(`${API_BASE_URL}${url}&api_key=${API_KEY}`);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setPerPage(6);
    } else if (window.innerWidth >= 924) {
      setPerPage(5);
      setGap("8px");
    } else if (window.innerWidth >= 628) {
      setPerPage(4);
      setGap("10px");
    } else {
      setPerPage(3);
      setGap("12px");
    }
  }, []);

  const handleLinkClick = (movie) => {
    history(`/movies/${movie.id}`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Container>
      <div className="top">
        <h2>재미와 감동을 느끼고싶을때</h2>
      </div>
      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
      {error && <h1>Error: {error.message}</h1>}

      <Splide
        options={{
          perPage,
          gap,
          pagination: false,
          drag: 'free',
          focus: 'center',
          arrows: true,
        }}
      >
        {happyMovies.results &&
          happyMovies.results.map((movie) => (
            <SplideSlide key={movie.id}>
              <SliderItem className={dark ? "" : "dark"}
                onClick={() => handleLinkClick(movie)}
              >
                <img
                  src={`${POSTER_URL}${movie.poster_path}`}
                  alt={movie.title}
                  loading='lazy'
                />
                <div className="average absolute top-0 left-0">{movie.vote_average.toFixed(2)}</div>
                <div className="slider_contents">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </SliderItem>
            </SplideSlide>
          ))}
      </Splide>
    </Container>
  );
};

export default HappyMovies;
