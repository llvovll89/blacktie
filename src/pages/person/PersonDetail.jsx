import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { DetailPage, Section, DetailPerson, ErrorBox } from '../../styles/GlobalStyle';
import { Loading, Spinner } from '../../styles/Loading';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const PersonDetail = () => {
  const { id } = useParams();
  const dark = useSelector((state) => state.darkMode.dark);
  const [perPage, setPerPage] = useState(6);
  const history = useNavigate();

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;
  const POSTER_URL = 'https://image.tmdb.org/t/p/w300/';
  const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280/';
  const NO_IMAGE_URL = 'https://via.placeholder.com/500x750.png?text=No+Image';

  const { data, error, isLoading } = useAxios(
    `${API_BASE_URL}/person/${id}?api_key=${API_KEY}&language=ko&append_to_response=combined_credits`
  );

  const { data: creditData } = useAxios(
    `${API_BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=ko`
  );

  const PERSON_PAGE_SIZE_LARGE = 5;
  const PERSON_PAGE_SIZE_MEDIUM = 4;
  const PERSON_PAGE_SIZE_SMALL = 3;

  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setPerPage(PERSON_PAGE_SIZE_LARGE);
    } else if (window.innerWidth >= 924) {
      setPerPage(PERSON_PAGE_SIZE_MEDIUM);
    } else if (window.innerWidth >= 628) {
      setPerPage(PERSON_PAGE_SIZE_SMALL);
    } else {
      setPerPage(PERSON_PAGE_SIZE_SMALL);
    }
  };

  const topRatedCast =
    creditData?.cast?.reduce((prev, current) => {
      return prev.vote_average > current.vote_average ? prev : current;
    }, []) || [];

  console.log(topRatedCast.backdrop_path);

  const handleClick = () => {
    history(-1);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <Section className={dark ? '' : 'dark'}>
      {isLoading && (
        <article className='loader_section'>
          <Loading>
            <Spinner />
          </Loading>
        </article>
      )}
      {error && (
        <ErrorBox>
          <h1>Error : {error.message}</h1>
        </ErrorBox>
      )}

      {!isLoading && !error && (
        <DetailPerson>
          <div
            className={dark ? 'content' : 'content dark'}
            style={{
              backgroundImage: topRatedCast
                ? `${BACKDROP_URL}${topRatedCast.backdrop_path}`
                : null,
            }}
          >
            <div className="left">
              <img
                src={
                  data.profile_path
                    ? `${POSTER_URL}${data.profile_path}`
                    : NO_IMAGE_URL
                }
                alt={data.name}
                loading="lazy"
              />
            </div>
            <div className="right">
              <div className="title">
                <h1>{data.name}</h1>
                <div className="sub">
                  <div className="items">
                    <p>생년월일</p>
                    <span>{data.birthday}</span>
                  </div>
                  <div className="items">
                    <p>출생지</p>
                    <span>{data.place_of_birth}</span>
                  </div>
                  <div className="items">
                    <p>직업</p>
                    <span>{data.known_for_department}</span>
                  </div>
                </div>
              </div>

              <div className="credit">
                {creditData && creditData.cast && creditData.cast.length > 0 ? (
                  <Splide
                    options={{
                      perPage: Math.min(creditData.cast.length, perPage),
                      pagination: false,
                      gap: '6px',
                      drag: 'free',
                      focus: 'center',
                      arrows: true,
                    }}
                  >
                    {creditData.cast.map((c) => (
                      <SplideSlide key={c.id}>
                        <div className="cast_contents">
                          <img
                            src={
                              c.poster_path
                                ? `${POSTER_URL}${c.poster_path}`
                                : NO_IMAGE_URL
                            }
                          />
                          <div className="cast_name">
                            <p>{c.title ? c.title : c.name}</p>
                            {c.character ? <p>{c.character}</p> : null}
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </Splide>
                ) : null}
              </div>
            </div>

            <button
              className="close_btn"
              onClick={handleClick}
              onTouchStart={handleClick}
            >
              <AiOutlineClose />
            </button>
          </div>
        </DetailPerson>
      )}
    </Section>
  );
};

export default PersonDetail;
