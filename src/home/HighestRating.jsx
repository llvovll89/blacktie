import React, {useState, useEffect, useCallback} from "react";
import useAxios from "../hooks/useAxios";
import {Container} from "../styles/GlobalStyle";
import {SliderItem} from "../styles/Sliders";
import {Loading, Spinner} from "../styles/Loading";
import {Link, useNavigate} from "react-router-dom";

import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {useSelector} from "react-redux";
import {useResize} from "./hooks/useResize";
import {API_BASE_URL, API_KEY, POSTER_URL} from "../routes/api/Api";
import {useMouseOver} from "./hooks/useMouseOver";

const HighestRating = ({url}) => {
    const {perPage, gap} = useResize();
    const {selectedHover, handleMouseOver, handleMouseOut} = useMouseOver();
    const dark = useSelector((state) => state.darkMode.dark);
    const history = useNavigate();

    const {data, isLoading, error} = useAxios(
        `${API_BASE_URL}${url}api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&vote_count.gte=100&with_original_language=ko&append_to_response=videos`
    );

    return (
        <Container>
            <div className="top">
                <h2>높은 평점의 영화</h2>
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
                    drag: "free",
                    focus: "center",
                    arrows: true,
                }}
            >
                {data.results &&
                    data.results.map((movie) => (
                        <SplideSlide key={movie.id}>
                            <SliderItem
                                className={dark ? "" : "dark"}
                                onMouseOver={() => handleMouseOver(movie.id)}
                                onMouseOut={() => handleMouseOut()}
                            >
                                {movie.videos &&
                                movie.videos.results.length &&
                                movie.videos.results.length > 0 ? (
                                    <iframe
                                        title={`${movie.title} trailer`}
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                                        allowFullScreen
                                        style={{border: "none"}}
                                    />
                                ) : (
                                    <img
                                        src={`${POSTER_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                )}
                                <div className="average">
                                    {movie.vote_average.toFixed(2)}
                                </div>

                                {selectedHover === movie.id && (
                                    <div className="slider_contents">
                                        <h3>{movie.title}</h3>
                                        <p>{movie.release_date}</p>
                                    </div>
                                )}
                            </SliderItem>
                        </SplideSlide>
                    ))}
            </Splide>
        </Container>
    );
};

export default HighestRating;
