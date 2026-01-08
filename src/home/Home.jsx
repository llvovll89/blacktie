import {useSelector} from "react-redux";
import {Section} from "../styles/GlobalStyle";
import {HomeRoutes} from "../routes/route/MainRoute";

const Home = () => {
    const dark = useSelector((state) => state.darkMode.dark);

    return (
        <Section className={dark ? "" : "dark"}>
            {HomeRoutes.map(({components: Component, url}, index) => (
                <Component key={index} url={url} />
            ))}
        </Section>
    );
};

export default Home;
