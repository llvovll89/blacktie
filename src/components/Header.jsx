import React, {useState, useEffect, useCallback, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";
import {HeaderContainer} from "../styles/GlobalStyle";
import {Loading, Spinner} from "../styles/Loading";
import {AiOutlineSearch, AiOutlineClose} from "react-icons/ai";
import {RxHamburgerMenu} from "react-icons/rx";
import {updateSearch} from "../redux/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import {Search} from "./search/Search";

const Header = () => {
    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const toggleRef = useRef(null);

    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [scrollBottom, setScrollBottom] = useState(false);
    const searchQuery = useSelector((state) => String(state.search.query));
    const {dark, bgColor, color} = useSelector((state) => state.darkMode);

    const toggleNavbar = () => {
        setIsNavbarVisible((prevState) => !prevState);
    };

    const toggleHandleClick = () => {
        toggleNavbar();
    };

    const searchHandler = (e) => {
        setIsSearchVisible((prevState) => !prevState);
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
                dispatch(updateSearch(""));
            }

            if (!toggleRef?.current?.contains(e.target)) {
                setIsNavbarVisible(false);
                dispatch(updateSearch(""));
            }
        },
        [setIsSearchVisible, setIsNavbarVisible]
    );

    const closeClickHandler = () => {
        setIsSearchVisible(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", scrollEvent);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", scrollEvent);
        };
    }, [dispatch, searchQuery, scrollEvent]);

    return (
        <HeaderContainer
            className={`${dark ? "" : "dark"} ${scrollBottom ? "bottom" : ""}`}
        >
            <div className="logo">
                <Link to="/">BLACK TIE</Link>
            </div>
            <div className="navbar">
                <div className="toggle" onClick={toggleHandleClick}>
                    {isNavbarVisible ? <AiOutlineClose /> : <RxHamburgerMenu />}
                </div>
                <div
                    className={`contents ${isNavbarVisible ? "open" : ""}`}
                    ref={toggleRef}
                    style={{
                        background: isNavbarVisible ? bgColor : undefined,
                        color: isNavbarVisible ? color : undefined,
                    }}
                >
                    <div className="dropdown">
                        <button className="dropdown-btn" style={{color: color}}>
                            영화
                        </button>
                        <div className="dropdown-content">
                            <Link
                                onClick={toggleHandleClick}
                                to="/category/movies"
                            >
                                전체영화
                            </Link>
                            <Link
                                onClick={toggleHandleClick}
                                to="/category/animation"
                            >
                                애니메이션 (영화)
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-btn" style={{color: color}}>
                            TV
                        </button>
                        <div className="dropdown-content">
                            <Link
                                onClick={toggleHandleClick}
                                to="/category/drama"
                            >
                                드라마
                            </Link>
                            <Link
                                onClick={toggleHandleClick}
                                to="/category/tv_enter"
                            >
                                예능프로그램
                            </Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-btn" style={{color: color}}>
                            애니메이션
                        </button>
                        <div className="dropdown-content">
                            <Link
                                onClick={toggleHandleClick}
                                to="/category/animation_jp"
                            >
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
                        <button className="dropdown-btn" style={{color: color}}>
                            인물
                        </button>
                        <div className="dropdown-content">
                            <Link
                                onClick={toggleHandleClick}
                                to="/person/popular"
                            >
                                유명인물
                            </Link>
                            <Link
                                onClick={toggleHandleClick}
                                to="/person/entertainer"
                            >
                                예능인
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="search" onClick={searchHandler}>
                    {isSearchVisible ? <AiOutlineClose /> : <AiOutlineSearch />}
                </div>
            </div>

            <Search
                isSearchVisible={isSearchVisible}
                setIsSearchVisible={setIsSearchVisible}
                searchRef={searchRef}
            />
        </HeaderContainer>
    );
};

export default Header;
