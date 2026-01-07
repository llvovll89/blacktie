import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import {
  Section,
  Results,
  Card,
  PaginationContainer,
  PaginationButton,
} from '../../styles/GlobalStyle';
import { Loading, Spinner } from '../../styles/Loading';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentPage, setCurrentPage } from '../../redux/paginationSlice';

// react-icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Animation = () => {
  const currentPage = useSelector(selectCurrentPage);
  const dark = useSelector((state) => state.darkMode.dark);
  const dispatch = useDispatch();

  const { VITE_API_KEY: API_KEY, VITE_BASE_URL: API_BASE_URL } = import.meta
    .env;

  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const { data, error, isLoading } = useAxios(
    `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&language=ko&with_genres=16&region=KR&primary_release_date.lte=${new Date()
      .toISOString()
      .slice(0, 10)}&page=${currentPage}`
  );

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Section className={dark ? '' : 'dark'}>
      <Results>
        {isLoading && (
          <Loading>
            <Spinner />
          </Loading>
        )}
        {error && <h1>Error: {error.message}</h1>}
        {data &&
          data.results &&
          data.results.map((ani) => (
            <Card key={ani.id}>
              <div className="contents">
                <div className="top">
                  {ani.poster_path && (
                    <Link to={`/movies/${ani.id}`}>
                      <img
                        src={`${POSTER_URL}${ani.poster_path}`}
                        alt={ani.title}
                      />
                    </Link>
                  )}
                </div>
                <div className="average">{ani.vote_average.toFixed(2)}</div>
                <div className="bot">
                  <p className="title">{ani.title}</p>
                  <p className="date">
                    <span> {ani.release_date}</span>
                  </p>
                </div>
              </div>
            </Card>
          ))}
      </Results>

      {data && (
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

export default Animation;
