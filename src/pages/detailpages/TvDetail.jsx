import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { Section, ErrorBox, DetailPage } from '../../styles/GlobalStyle';
import { Loading, Spinner } from '../../styles/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const TvDetail = () => {
  const { id } = useParams();
  const [perPage, setPerPage] = useState(6);
  const history = useNavigate();
  const dark = useSelector((state) => state.darkMode.dark);

  const NO_IMAGE_URL = 'https://via.placeholder.com/500x750.png?text=No+Image';
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w300/';
  const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280/';

  const { data, isLoading, error } = useAxios(
    `${API_BASE_URL}/tv/${id}?api_key=${API_KEY}&language=ko`
  );

  const { data: trailerData } = useAxios(
    `${API_BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=ko`
  );
  const { data: castData } = useAxios(
    `${API_BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=ko-KR`
  );

  const { data: recommendedTVData } = useAxios(
    `${API_BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=ko-KR`
  );

  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setPerPage(6);
    } else if (window.innerWidth >= 924) {
      setPerPage(4);
    } else if (window.innerWidth >= 628) {
      setPerPage(3);
    } else {
      setPerPage(2);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleClick = () => {
    history(-1);
  };

  return (
    <Section className={dark ? '' : 'dark'}>
      {isLoading && (
        <Loading>
          <Spinner />
        </Loading>
      )}
      {error && (
        <ErrorBox>
          <h1>Error : {error.message}</h1>
        </ErrorBox>
      )}
      {!isLoading && !error && (
        <DetailPage>
          <div className="content">
            <div className="top">
              {trailerData?.results?.length > 0 ? (
                <iframe
                  title={`${data.title} trailer`}
                  width="100%"
                  height="500px"
                  src={`https://www.youtube.com/embed/${trailerData.results[0].key}`}
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              ) : (
                <img
                  src={
                    data.backdrop_path
                      ? `${BACKDROP_URL}${data.backdrop_path}`
                      : `${POSTER_URL}${data.poster_path}`
                  }
                  alt={data.name}
                />
              )}
            </div>
            <div className="bot">
              <div className="title">
                <h1>{data.name}</h1>
                <div className="sub">
                  <span>{data.first_air_date}</span>
                  <span>
                    {data.genres.map((genre) => genre.name).join(' ')}
                  </span>
                  <span>총 {data.episode_run_time} (화)</span>
                </div>
              </div>

              <div className="net">
                <div className="pro_name">
                  <span>{data.networks[0].name}</span>
                </div>
              </div>

              {castData && castData.cast && (
                <Splide
                  options={{
                    perPage,
                    pagination: false,
                    gap: '6px',
                    drag: 'free',
                    focus: 'center',
                    arrows: true,
                  }}
                >
                  {castData.cast.slice(0, 12).map((c) => (
                    <SplideSlide key={c.id}>
                      <div className="cast_contents">
                        <img
                          src={
                            c.profile_path
                              ? `${POSTER_URL}${c.profile_path}`
                              : NO_IMAGE_URL
                          }
                        />
                        <div className="cast_name">
                          <p>{c.name}</p>
                          {c.character ? <p>{c.character}</p> : null}
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              )}

              {data.overview || recommendedTVData.results > 0 ? (
                <div className="items">
                  <div className="items_t">
                    <h3>개요</h3>
                    <p>
                      {data.overview.length > 400
                        ? data.overview.slice(0, 400) + '...'
                        : data.overview}
                    </p>
                  </div>

                  <div className="items_b">
                    <h3>비슷한방송</h3>
                    {recommendedTVData &&
                      recommendedTVData.results &&
                      recommendedTVData.results.length > 0 && (
                        <Splide
                          options={{
                            perPage,
                            pagination: false,
                            gap: '6px',
                            drag: 'free',
                            focus: 'center',
                            arrows: true,
                          }}
                        >
                          {recommendedTVData.results.slice(0, 12).map((c) => (
                            <SplideSlide key={c.id}>
                              <div className="recommended-movies">
                                <Link to={`/tv/${c.id}`}>
                                  <img
                                    src={
                                      c.poster_path
                                        ? `${POSTER_URL}${c.poster_path}`
                                        : NO_IMAGE_URL
                                    }
                                    alt={c.title}
                                  />
                                </Link>
                              </div>
                            </SplideSlide>
                          ))}
                        </Splide>
                      )}
                  </div>
                </div>
              ) : (
                <div className="sub_data">
                  <div className="sub_item">
                    <h3>{data.last_episode_to_air.name}</h3>
                    <span>{data.last_episode_to_air.air_date}</span>
                    <img
                      src={
                        data.last_episode_to_air.still_path
                          ? `${POSTER_URL}${data.last_episode_to_air.still_path}`
                          : null
                      }
                      alt=""
                    />
                  </div>
                  <div className="sub_item">
                    <h3>{data.next_episode_to_air.name}</h3>
                    <span>{data.next_episode_to_air.air_date}</span>
                    <img
                      src={
                        data.next_episode_to_air.still_path
                          ? `${POSTER_URL}${data.next_episode_to_air.still_path}`
                          : null
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleClick} onTouchStart={handleClick}>
              <AiOutlineClose />
            </button>
          </div>
        </DetailPage>
      )}
    </Section>
  );
};

export default TvDetail;
