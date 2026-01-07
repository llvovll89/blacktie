import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  Results,
  Section,
  PaginationButton,
  PaginationContainer,
} from '../../styles/GlobalStyle';
import { Loading, Spinner } from '../../styles/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, setCurrentPage } from '../../redux/paginationSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Movies = () => {
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const history = useNavigate();
  const dark = useSelector((state) => state.darkMode.dark);

  const { VITE_API_KEY: API_KEY, VITE_BASE_URL: API_BASE_URL } = import.meta
    .env;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const { data, error, isLoading } = useAxios(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=18&region=KR&primary_release_date.lte=${new Date()
      .toISOString()
      .slice(0, 10)}&page=${currentPage}`
  );

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleLinkClick = (movie) => {
    history(`/movies/${movie.id}`);
  };

  return (
    <Section className={dark ? '' : 'dark'}>
      <Results $isLoading={isLoading}>
        {isLoading && (
          <Loading>
            <Spinner />
          </Loading>
        )}

        {error && <p>Error: {error.message}</p>}
        {!isLoading && data &&
          data.results &&
          data.results.slice(0, 12).map((movie) => (
            <Card key={movie.id}>
              <div className="contents" onClick={() => handleLinkClick(movie)}>
                <div className="top">
                  {movie.poster_path && (
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={`${POSTER_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                      />
                    </Link>
                  )}
                </div>
                <div className="average">{movie.vote_average.toFixed(2)}</div>
                <div className="bot">
                  <p className="title">{movie.title}</p>
                  <p className="date">
                    <span> {movie.release_date}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
      </Results>

      {!isLoading && data.results && (
        <PaginationContainer>
          <PaginationButton
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaArrowLeft />
          </PaginationButton>
          <PaginationButton onClick={() => handlePageChange(currentPage + 1)}>
            <FaArrowRight />
          </PaginationButton>
        </PaginationContainer>
      )}
    </Section>
  );
};

export default Movies;
