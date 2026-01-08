import React, {useEffect, useState} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {Section, ErrorBox, DetailPage} from "../../styles/GlobalStyle";
import {Loading, Spinner} from "../../styles/Loading";
import useAxios from "../../hooks/useAxios";
import {useDispatch, useSelector} from "react-redux";
import {likeClick} from "../../redux/likeSlice";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {AiOutlineClose} from "react-icons/ai";

const MovieDetail = () => {
    const {id} = useParams();
    const dark = useSelector((state) => state.darkMode.dark);
    const [perPage, setPerPage] = useState(6);

    const NO_IMAGE_URL =
        "https://via.placeholder.com/500x500.png?text=No+Image";
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const POSTER_URL = "https://image.tmdb.org/t/p/w500/";
    const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280/";

    const history = useNavigate();

    const {data, isLoading, error} = useAxios(
        `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    );

    const {data: trailerData} = useAxios(
        `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
    );
    const {data: castData} = useAxios(
        `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
    );

    const {data: recommendedMoviesData} = useAxios(
        `${API_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR`
    );

    const handleClick = () => {
        history(-1);
    };

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
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    if (isLoading)
        return (
            <Loading>
                <Spinner />
            </Loading>
        );
    if (error)
        return (
            <ErrorBox>
                <h1>{error}</h1>
            </ErrorBox>
        );

    return (
        <Section className={dark ? "" : "dark"}>
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
                                style={{border: "none"}}
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
                            <h1>{data.title}</h1>
                            <div className="sub">
                                <span>{data.release_date}</span>
                                <span>{data.runtime} (분)</span>
                                <span>
                                    {data.genres
                                        .map((genre) => genre.name)
                                        .join(" ")}
                                </span>
                            </div>
                        </div>

                        <div className="net">
                            {data.production_companies &&
                            data.production_companies.length > 0
                                ? data.production_companies
                                      .slice(0, 4)
                                      .map((pro) => (
                                          <div
                                              className="pro_name"
                                              key={pro.id}
                                          >
                                              <span>{pro.name}</span>
                                          </div>
                                      ))
                                : null}
                        </div>

                        {castData &&
                        castData.cast &&
                        castData.cast.length > 0 ? (
                            <Splide
                                options={{
                                    perPage,
                                    pagination: false,
                                    gap: "6px",
                                    drag: "free",
                                    focus: "center",
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
                                                {c.character ? (
                                                    <p>{c.character}</p>
                                                ) : null}
                                            </div>
                                        </div>
                                    </SplideSlide>
                                ))}
                            </Splide>
                        ) : null}

                        {data.overview || recommendedMoviesData.results > 0 ? (
                            <div className="items">
                                <div className="items_t">
                                    <h3>{data.overview ? "개요" : null}</h3>
                                    <p>
                                        {data.overview.length > 400
                                            ? data.overview.slice(0, 400) +
                                              "..."
                                            : data.overview}
                                    </p>
                                </div>

                                <div className="items_b">
                                    <h3>
                                        {recommendedMoviesData &&
                                        recommendedMoviesData.results &&
                                        recommendedMoviesData.results.length > 0
                                            ? "비슷한영화"
                                            : null}
                                    </h3>
                                    {recommendedMoviesData &&
                                        recommendedMoviesData.results &&
                                        recommendedMoviesData.results.length >
                                            0 && (
                                            <Splide
                                                options={{
                                                    perPage,
                                                    pagination: false,
                                                    gap: "6px",
                                                    drag: "free",
                                                    focus: "center",
                                                    arrows: true,
                                                }}
                                            >
                                                {recommendedMoviesData.results
                                                    .slice(0, 12)
                                                    .map((c) => (
                                                        <SplideSlide key={c.id}>
                                                            <div className="recommended-movies">
                                                                <Link
                                                                    to={`/movies/${c.id}`}
                                                                >
                                                                    <img
                                                                        src={
                                                                            c.poster_path
                                                                                ? `${POSTER_URL}${c.poster_path}`
                                                                                : NO_IMAGE_URL
                                                                        }
                                                                        alt={
                                                                            c.title
                                                                        }
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
                            <div className="non">
                                <p>아직 정보가없습니다.</p>
                            </div>
                        )}
                    </div>
                    <button
                        className="close_btn"
                        onClick={handleClick}
                        onTouchStart={handleClick}
                    >
                        <AiOutlineClose />
                    </button>
                </div>
            </DetailPage>
        </Section>
    );
};

export default MovieDetail;
