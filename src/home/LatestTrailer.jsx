import React, { useState, useEffect, useCallback } from 'react';
import useAxios from '../hooks/useAxios';
import { TrailerContainer } from '../styles/GlobalStyle';
import { SliderItem } from '../styles/Sliders';
import { Loading, Spinner } from '../styles/Loading';
import { Link, useNavigate } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useSelector } from 'react-redux';

const LatestTrailer = ({ url }) => {
  const dark = useSelector((state) => state.darkMode.dark);
  const [perPage, setPerPage] = useState(6);
  const [gap, setGap] = useState('6px');

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const history = useNavigate();

  // const { data, isLoading, error } = useAxios(
  //   // `${API_BASE_URL}${url}api_key=${API_KEY}&language=ko&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&vote_count.gte=100&with_original_language=ko&append_to_response=videos`
  //   // `${API_BASE_URL}${url}api_key=${API_KEY}&language=ko-KR&page=1`
  //   `${API_BASE_URL}${url}${id}/videos?api_key=${API_KEY}&language=ko-KR&site=YouTube`
  //   );

  const { data, isLoading, error } = useAxios(
    `${API_BASE_URL}${url}api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&vote_count.gte=100&with_original_language=ko&append_to_response=videos`
  );
  console.log(data);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1280) {
      setPerPage(4);
    } else if (window.innerWidth >= 924) {
      setPerPage(3);
      setGap('8px');
    } else if (window.innerWidth >= 628) {
      setPerPage(2);
      setGap('10px');
    } else {
      setPerPage(1);
      setGap('3px');
    }
  }, []);

  // const handleLinkClick = (movie) => {
  // history(`/movies/${movie.id}`);
  // };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <TrailerContainer>
      <div className="top">
        <h2>인기 많은 스트리밍</h2>
      </div>

      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
      {error && <h1>Error: {error.message}</h1>}

      <Splide
        options={{
          pagination: false,
          perPage,
          gap,
          drag: 'free',
          focus: 'center',
          arrows: true,
        }}
      >
        {data.results &&
          data.results.map((movie) => (
            <SplideSlide key={movie.id}>
              <SliderItem className={dark ? '' : 'dark'}>
                {movie.videos &&
                  movie.videos.results.length &&
                  movie.videos.results.length > 0 ? (
                  <iframe
                    title={`${movie.title} trailer`}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                    allowFullScreen
                    style={{ border: 'none' }}
                  />
                ) : (
                  <img
                    src={`${POSTER_URL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <div className="average absolute top-0 left-0">{movie.vote_average.toFixed(2)}</div>
                <div className="slider_contents">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </SliderItem>
            </SplideSlide>
          ))}
      </Splide>
    </TrailerContainer>
  );
};

export default LatestTrailer;
