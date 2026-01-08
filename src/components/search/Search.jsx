import {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import useDebounce from "../../hooks/useDebounce";
import {API_BASE_URL, API_KEY} from "../../routes/api/Api";
import {updateSearch} from "../../redux/searchSlice";
import {useNavigate} from "react-router-dom";

const SearchBar = styled.div`
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0;
    top: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease, pointer-events 0.3s ease;
    padding: 0 40px;

    &.open {
        display: flex;
        align-items: center;
        pointer-events: auto;
        opacity: 1;
    }

    form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    input {
        padding: 0 1.25rem;
        width: 100%;
        height: 80%;
        color: #fff;
        background-color: #000;
        border-radius: 1rem;
    }
`;

export const Search = ({isSearchVisible, searchRef, setIsSearchVisible}) => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => String(state.search.query));
    const searchInput = useRef(null);
    const history = useNavigate();
    const debounceSearchQuery = useDebounce(searchQuery, 500);

    const {data, isLoading, error} = useAxios(
        `${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${debounceSearchQuery}&language=ko`
    );

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log("호출");

            if (searchQuery.trim().length < 1) {
                return;
            }

            if (data && data.results) {
                const {results} = data;

                const filteredResults = results.filter(
                    (result) =>
                        result.media_type === "movie" ||
                        result.media_type === "person"
                );

                history(`/search/${searchQuery}`, {
                    state: {results: filteredResults},
                });
            }

            setIsSearchVisible(false);
            e.target.elements.searchInput &&
                (e.target.elements.searchInput.value = "");
        },
        [data, dispatch, history, searchQuery]
    );

    useEffect(() => {
        if (isSearchVisible && searchInput.current) {
            searchInput.current.focus();
        }
    }, [isSearchVisible]);

    return (
        <SearchBar className={isSearchVisible ? "open" : ""} ref={searchRef}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="영화제목 & TV제목 & 출연진이름 검색"
                    onChange={(e) => dispatch(updateSearch(e.target.value))}
                    value={searchQuery}
                    ref={searchInput}
                />
            </form>
        </SearchBar>
    );
};
