import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, setCurrentPage } from '../../redux/paginationSlice';
import { Link } from 'react-router-dom';
import {
  Results,
  Section,
  Card,
  PaginationButton,
  PaginationContainer,
} from '../../styles/GlobalStyle';
import { Loading, Spinner } from '../../styles/Loading';

// react-icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRef } from 'react';

const Drama = () => {
  const dark = useSelector((state) => state.darkMode.dark);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();

  const resultsRef = useRef(null);
  // const [resultsWidth, setResultsWidth] = useState(0);

  const { VITE_API_KEY: API_KEY, VITE_BASE_URL: API_BASE_URL } = import.meta
    .env;

  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const { data, isLoading, error } = useAxios(
    `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko&with_original_language=ko&region=KRprimary_release_date.lte=${new Date()
      .toISOString()
      .slice(0, 10)}&page=${currentPage}`
  );

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Section className={dark ? '' : 'dark'}>
      <Results ref={resultsRef}>
        {isLoading && (
          <Loading>
            <Spinner />
          </Loading>
        )}
        {error && <h1>Error: {error.message}</h1>}
        {data &&
          data.results &&
          data.results.map((drama) => (
            <Card key={drama.id}>
              <div className="contents">
                <div className="top">
                  {drama.poster_path && (
                    <Link to={`/tv/${drama.id}`}>
                      <img
                        src={`${POSTER_URL}${drama.poster_path}`}
                        alt={drama.name}
                      />
                    </Link>
                  )}
                </div>
                <div className="average">{drama.vote_average.toFixed(2)}</div>
                <div className="bot">
                  <p className="title">{drama.name}</p>
                  <p className="date">
                    <span>{drama.first_air_date}</span>
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

export default Drama;
