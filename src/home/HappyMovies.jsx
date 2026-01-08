import useAxios from "../hooks/useAxios";
import {Container} from "../styles/GlobalStyle";
import {SliderItem} from "../styles/Sliders";
import {useNavigate} from "react-router-dom";
import {Loading, Spinner} from "../styles/Loading";

import {Splide, SplideSlide} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {useSelector} from "react-redux";
import {useResize} from "./hooks/useResize";
import {API_BASE_URL, API_KEY, POSTER_URL} from "../routes/api/Api";
import {useMouseOver} from "./hooks/useMouseOver";

const HappyMovies = ({url}) => {
    const {selectedHover, handleMouseOver, handleMouseOut} = useMouseOver();
    const {gap, perPage} = useResize();

    const history = useNavigate();
    const dark = useSelector((state) => state.darkMode.dark);

    const {
        data: happyMovies,
        isLoading,
        error,
    } = useAxios(`${API_BASE_URL}${url}&api_key=${API_KEY}`);

    const handleLinkClick = (movie) => {
        history(`/movies/${movie.id}`);
    };

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
                    drag: "free",
                    focus: "center",
                    arrows: true,
                }}
            >
                {happyMovies.results &&
                    happyMovies.results.map((movie) => (
                        <SplideSlide key={movie.id}>
                            <SliderItem
                                className={dark ? "" : "dark"}
                                onClick={() => handleLinkClick(movie)}
                                onMouseOver={() => handleMouseOver(movie.id)}
                                onMouseOut={() => handleMouseOut()}
                            >
                                <img
                                    src={`${POSTER_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    loading="lazy"
                                />
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

export default HappyMovies;
