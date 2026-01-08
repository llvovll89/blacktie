import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Header from "./components/Header";
import Top from "./common/Top";
import store from "./redux/store";
import Footer from "./components/Footer";
import {ResetStyle} from "./styles/ResetStyle";
import {GlobalWrap} from "./styles/GlobalStyle";
import ProgressBar from "./common/Progressbar";
import {DarkMode} from "./components/DarkMode";
import {routes} from "./routes/route/Route";
import "./styles/font.css";

function App() {
    return (
        <Provider store={store}>
            <Router basename={import.meta.env.VITE_PUBLIC_URL}>
                <ResetStyle />
                <GlobalWrap>
                    <ProgressBar />
                    <Header />
                    <Top />
                    <Routes>
                        {routes.map(({route, components: Component}) => (
                            <Route
                                key={route}
                                path={route}
                                element={<Component />}
                            />
                        ))}
                    </Routes>
                    <DarkMode />
                    <Footer />
                </GlobalWrap>
            </Router>
        </Provider>
    );
}

export default App;
