import React from 'react';
import {
  Card,
  Section,
  Results,
  PaginationButton,
  PaginationContainer,
} from '../../styles/GlobalStyle';
import { Loading } from '../../styles/Loading';
import useAxios from '../../hooks/useAxios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPage, setCurrentPage } from '../../redux/paginationSlice';

// react-icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const JapanAni = () => {
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const history = useNavigate();

  const dark = useSelector((state) => state.darkMode.dark);

  const { VITE_API_KEY: API_KEY, VITE_BASE_URL: API_BASE_URL } = import.meta
    .env;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500/';
  const NO_IMAGE_URL = 'https://via.placeholder.com/500x750.png?text=No+Image';

  const { data, error, isLoading } = useAxios(
    `${API_BASE_URL}/discover/tv?api_key=${API_KEY}&language=ko&sort_by=release_date.desc&with_genres=16&with_original_language=ja&air_date.lte=${new Date()
      .toISOString()
      .slice(0, 10)}&page=${currentPage}`
  );

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleLinkClick = (ani) => {
    history(`/tv/${ani.id}`);
  };


  return (
    <Section className={dark ? '' : 'dark'}>
      <Results>
        {isLoading && (
          <Loading>
          </Loading>
        )}
        {error && <p>Error: {error.message}</p>}
        {data &&
          data.results &&
          data.results.map((ani) => (
            <Card key={ani.id}>
              <div className="contents" onClick={() => handleLinkClick(ani)}>
                <div className="top">
                  {ani.poster_path ? (
                    <Link to={`/tv/${ani.id}`}>
                      <img
                        src={`${POSTER_URL}${ani.poster_path}`}
                        alt={ani.name}
                        loading='lazy'
                      />
                    </Link>
                  ) : (
                    <Link to={`/tv/${ani.id}`}>
                      <img src={NO_IMAGE_URL} alt="No image available" />
                    </Link>
                  )}
                </div>
                <div className="average">{ani.vote_average.toFixed(2)}</div>
                <div className="bot">
                  <p className="title">
                    {ani.name.length > 20
                      ? ani.name.slice(0, 20) + '...'
                      : ani.name}
                  </p>
                  <p className="date">
                    <span>{ani.first_air_date}</span>
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

export default JapanAni;
