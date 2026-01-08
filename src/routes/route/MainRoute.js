import ForeignNetflix from "../../home/ForeignNetflix";
import HappyMovies from "../../home/HappyMovies";
import HighestRating from "../../home/HighestRating";
import PopulateTv from "../../home/PopulateTv";
import PopularMovies from "../../home/PopularMovies";

export const MOVIE_POPULAR_URL = "/movie/popular";
export const NETFLIX_ORIGINALS_URL = "/discover/tv?with_networks=213";
export const HAPPY_MOVIES_URL =
    "/discover/movie?with_genres=35&sort_by=popularity.desc&language=ko-KR&page=1&region=KR";
export const UP_COMMING_MOVIE = "/movie/top_rated?";
export const POPULATE_TV = "/tv/popular?";

export const HomeRoutes = [
    {
        components: PopularMovies,
        url: MOVIE_POPULAR_URL,
    },
    {
        components: PopulateTv,
        url: POPULATE_TV,
    },
    {
        components: ForeignNetflix,
        url: NETFLIX_ORIGINALS_URL,
    },
    {
        components: HighestRating,
        url: UP_COMMING_MOVIE,
    },
    {
        components: HappyMovies,
        url: HAPPY_MOVIES_URL,
    },
];
