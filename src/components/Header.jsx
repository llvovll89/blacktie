import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import useDebounce from '../hooks/useDebounce';
import { HeaderContainer } from '../styles/GlobalStyle';
import { Loading, Spinner } from '../styles/Loading';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { MdDarkMode, MdSunny } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { updateSearch } from '../redux/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const toggleRef = useRef(null);
  const searchInput = useRef(null);

  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [scrollBottom, setScrollBottom] = useState(false);
  const searchQuery = useSelector((state) => String(state.search.query));
  const { dark, bgColor, color } = useSelector((state) => state.darkMode);

  const history = useNavigate();

  const { VITE_API_KEY: API_KEY, VITE_BASE_URL: API_BASE_URL } = import.meta
    .env;

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const { data, isLoading, error } = useAxios(
    `${API_BASE_URL}/search/multi?api_key=${API_KEY}&query=${debounceSearchQuery}&language=ko`
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (searchQuery.trim().length < 1) {
        return;
      }

      if (data && data.results) {
        const { results } = data;

        const filteredResults = results.filter(
          (result) =>
            result.media_type === 'movie' || result.media_type === 'person'
        );

        history(`/search/${searchQuery}`, {
          state: { results: filteredResults },
        });
      }

      setIsSearchVisible(false);
      e.target.elements.searchInput &&
        (e.target.elements.searchInput.value = '');
    },
    [data, dispatch, history, searchQuery]
  );

  const toggleNavbar = () => {
    setIsNavbarVisible((prevState) => !prevState);
  };

  const toggleHandleClick = () => {
    toggleNavbar();
  };

  const searchHandler = () => {
    setIsSearchVisible((prevState) => !prevState);
    searchInput.current.focus();
  };

  const scrollEvent = useCallback(() => {
    if (window.scrollY >= 56) {
      setScrollBottom(true);
    } else {
      setScrollBottom(false);
    }
  }, []);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        !searchRef?.current?.contains(e.target) &&
        !toggleRef?.current?.contains(e.target)
      ) {
        setIsSearchVisible(false);
      }

      if (!toggleRef?.current?.contains(e.target)) {
        setIsNavbarVisible(false);
      }
    },
    [setIsSearchVisible, setIsNavbarVisible]
  );

  const closeClickHandler = () => {
    setIsSearchVisible(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', scrollEvent);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', scrollEvent);
    };
  }, [dispatch, searchQuery, scrollEvent]);

  return (
    <HeaderContainer className={`${dark ? '' : 'dark'
      } ${scrollBottom ? 'bottom' : ''}`}>

      <div className="logo">
        <Link to="/">BLACK TIE</Link>
      </div>
      <div className="navbar">
        <div className="toggle" onClick={toggleHandleClick}>
          {isNavbarVisible ? <AiOutlineClose /> : <RxHamburgerMenu />}
        </div>
        <div
          className={`contents ${isNavbarVisible ? 'open' : ''}`}
          ref={toggleRef}
          style={{
            background: isNavbarVisible ? bgColor : undefined,
            color: isNavbarVisible ? color : undefined,
          }}
        >
          <div className="dropdown">
            <button className="dropdown-btn" style={{ color: color }}>
              영화
            </button>
            <div className="dropdown-content">
              <Link onClick={toggleHandleClick} to="/category/movies">
                전체영화
              </Link>
              <Link onClick={toggleHandleClick} to="/category/animation">
                애니메이션 (영화)
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn" style={{ color: color }}>
              TV
            </button>
            <div className="dropdown-content">
              <Link onClick={toggleHandleClick} to="/category/drama">
                드라마
              </Link>
              <Link onClick={toggleHandleClick} to="/category/tv_enter">
                예능프로그램
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn" style={{ color: color }}>
              애니메이션
            </button>
            <div className="dropdown-content">
              <Link onClick={toggleHandleClick} to="/category/animation_jp">
                전체 (일본원작)
              </Link>
              <Link
                onClick={toggleHandleClick}
                to="/category/animation_jp_theater"
              >
                애니 (극장판)
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropdown-btn" style={{ color: color }}>
              인물
            </button>
            <div className="dropdown-content">
              <Link onClick={toggleHandleClick} to="/person/popular">
                유명인물
              </Link>
              <Link onClick={toggleHandleClick} to="/person/entertainer">
                예능인
              </Link>
            </div>
          </div>
        </div>

        <div
          className="search"
          onClick={searchHandler}
        // onTouchStart={searchHandler}
        >
          {isSearchVisible ? <AiOutlineClose /> : <AiOutlineSearch />}
        </div>
      </div>

      <div
        className={`search_bar ${isSearchVisible ? 'open' : ''}`}
        ref={searchRef}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="영화제목 & TV제목 & 출연진이름 검색"
            onChange={(e) => dispatch(updateSearch(e.target.value))}
            ref={searchInput}
          />
          <button
            className="close_btn"
            onClick={closeClickHandler}
            onTouchStart={closeClickHandler}
          >
            <AiOutlineClose />
          </button>
        </form>
      </div>
    </HeaderContainer>
  );
};

export default Header;
