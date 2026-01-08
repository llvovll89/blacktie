import {useSelector} from "react-redux";
import {useMouseOver} from "./hooks/useMouseOver";
import {useResize} from "./hooks/useResize";
import {useNavigate} from "react-router-dom";
import {Container} from "../styles/GlobalStyle";
import {Loading, Spinner} from "../styles/Loading";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import {SliderItem} from "../styles/Sliders";
import useAxios from "../hooks/useAxios";
import {API_BASE_URL, API_KEY, POSTER_URL} from "../routes/api/Api";

const PopulateTv = ({url}) => {
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
                <h2>현재 가장 인기있는 TV 프로그램</h2>
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
                                        <h3>{movie.name}</h3>
                                        <p>{movie.first_air_date}</p>
                                    </div>
                                )}
                            </SliderItem>
                        </SplideSlide>
                    ))}
            </Splide>
        </Container>
    );
};

export default PopulateTv;
