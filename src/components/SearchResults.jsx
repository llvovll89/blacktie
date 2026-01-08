import React, {useState} from "react";
import {
    Card,
    Section,
    ErrorBox,
    SearchContainer,
    Results,
    PaginationButton,
    PaginationContainer,
} from "../styles/GlobalStyle";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentPage, setCurrentPage} from "../redux/paginationSlice";
import {Loading, Spinner} from "../styles/Loading";
import {Link, useParams} from "react-router-dom";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import useAxios from "../hooks/useAxios";

function SearchResults() {
    const currentPage = useSelector(selectCurrentPage);

    const {query} = useParams();
    const dispatch = useDispatch();

    const dark = useSelector((state) => state.darkMode.dark);

    const [filter, setFilter] = useState("all");
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_BASE_URL = import.meta.env.VITE_BASE_URL;
    const POSTER_URL = "https://image.tmdb.org/t/p/w500/";
    const NO_IMAGE_URL =
        "https://via.placeholder.com/500x500.png?text=No+Image";

    const {data, isLoading, error} = useAxios(
        `${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}&language=ko&page=${currentPage}`
    );

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredData =
        filter === "all"
            ? data.results || []
            : (data.results || []).filter((movie) => {
                  if (!movie.production_countries) {
                      return false;
                  }
                  return filter === "korean"
                      ? movie.production_countries.some(
                            (country) => country.iso_3166_1 === "KR"
                        )
                      : movie.production_countries.every(
                            (country) => country.iso_3166_1 !== "KR"
                        );
              });

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    if (isLoading) {
        return (
            <Loading>
                <Spinner />
            </Loading>
        );
    }

    if (error) {
        return <ErrorBox>Error: {error.message}</ErrorBox>;
    }

    // <SearchContainer> </SearchContainer>

    return (
        <Section className={dark ? "" : "dark"}>
            <div className="items">
                <p>
                    <span>" {query} "</span> (으)로 검색하신 결과 입니다.
                    <span> 총 {data.total_results}개</span>
                </p>
                <div className="filter">
                    <select
                        name="filter"
                        value={filter}
                        onChange={handleFilterChange}
                    >
                        <option value="all">전체</option>
                        <option value="korean">한국영화</option>
                        <option value="foreign">외국영화</option>
                    </select>
                </div>
            </div>

            {filteredData.length > 0 ? (
                <Results>
                    {filteredData.map((movie) => (
                        <Card key={movie.id}>
                            <div className="contents">
                                <div className="top">
                                    <Link
                                        to={
                                            movie.media_type === "movie"
                                                ? `/movies/${movie.id}`
                                                : movie.media_type === "person"
                                                ? `/character/${movie.id}`
                                                : movie.media_type === "tv"
                                                ? `/tv/${movie.id}`
                                                : ""
                                        }
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `${POSTER_URL}${movie.poster_path}`
                                                    : movie.profile_path
                                                    ? `${POSTER_URL}${movie.profile_path}`
                                                    : movie.known_for &&
                                                      movie.known_for[0]
                                                          .backdrop_path
                                                    ? `${POSTER_URL}${movie.known_for[0].backdrop_path}`
                                                    : NO_IMAGE_URL
                                            }
                                            alt={movie.title}
                                            loading="lazy"
                                        />
                                    </Link>
                                </div>
                                <div className="bot">
                                    <p className="title">
                                        {movie.title ? movie.title : movie.name}
                                    </p>
                                    <div className="aver">
                                        {movie.vote_average ? (
                                            <p>
                                                평점 -{" "}
                                                <span>
                                                    {movie.vote_average.toFixed(
                                                        2
                                                    )}
                                                </span>
                                            </p>
                                        ) : movie.popularity ? (
                                            <p>
                                                인기 -{" "}
                                                <span>
                                                    {movie.popularity.toFixed(
                                                        2
                                                    )}
                                                </span>
                                            </p>
                                        ) : (
                                            <p>값 없음</p>
                                        )}
                                    </div>
                                    <p className="date">
                                        {movie.release_date
                                            ? movie.release_date
                                            : (movie.known_for || []).map(
                                                  (item) => (
                                                      <span key={item.id}>
                                                          {item.name ||
                                                              item.title}
                                                      </span>
                                                  )
                                              )}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </Results>
            ) : (
                <div className="non_page">
                    <h1>404 NOT FOUND</h1>
                    <p>검색 결과가 없습니다.</p>
                    <p>다른 검색어로 다시 시도해주세요.</p>
                </div>
            )}

            {data && (
                <PaginationContainer>
                    <PaginationButton
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <FaArrowLeft />
                    </PaginationButton>
                    <PaginationButton
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <FaArrowRight />
                    </PaginationButton>
                </PaginationContainer>
            )}
        </Section>
    );
}

export default SearchResults;
