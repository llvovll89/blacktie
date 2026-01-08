import NotFound from "../../components/NotFound";
import SearchResults from "../../components/SearchResults";
import Home from "../../home/Home";
import Category from "../../pages/Category";
import MovieDetail from "../../pages/detailpages/MovieDetail";
import TvDetail from "../../pages/detailpages/TvDetail";
import Person from "../../pages/Person";
import PersonDetail from "../../pages/person/PersonDetail";

export const MAIN = "/";
export const MOVIE_DETAIL = "/movies/:id";
export const TV_DETAIL = "/tv/:id";
export const PERSON_DETAIL = "/character/:id";
export const SEARCH_RESULTS = "/search/:query";
export const CATEGORY = "/category/*";
export const PERSON = "/person/*";
export const NOT_FOUND = "*";

export const routes = [
    {
        route: MAIN,
        components: Home,
    },
    {
        route: MOVIE_DETAIL,
        components: MovieDetail,
    },
    {
        route: TV_DETAIL,
        components: TvDetail,
    },
    {
        route: PERSON_DETAIL,
        components: PersonDetail,
    },
    {
        route: SEARCH_RESULTS,
        components: SearchResults,
    },
    {
        route: CATEGORY,
        components: Category,
    },
    {
        route: PERSON,
        components: Person,
    },
    {
        route: NOT_FOUND,
        components: NotFound,
    },
];
