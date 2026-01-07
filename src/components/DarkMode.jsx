import { MdDarkMode, MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { darkOn } from "../redux/darkmodeSlice";
import styled from "styled-components";

const DarkModeContainer = styled.button`
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;

    background: ${(props) => (props.$dark ? "#292a2d" : "#f1f1f1")};
    color: ${(props) => (props.$dark ? "#f1f1f1" : "#292a2d")};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    cusror: pointer;
`;

export const DarkMode = () => {
    const { dark } = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    const darkClickHandler = () => {
        dispatch(darkOn());
    };

    return (
        <DarkModeContainer $dark={dark} onClick={darkClickHandler}>
            {dark ? <MdDarkMode /> : <MdSunny />}
        </DarkModeContainer>
    )
};