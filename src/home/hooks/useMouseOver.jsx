import {useState} from "react";

export const useMouseOver = () => {
    const [selectedHover, setSelectedHover] = useState(null);

    const handleMouseOver = (id) => {
        setSelectedHover(id);
    };

    const handleMouseOut = () => {
        setSelectedHover(null);
    };

    return {
        selectedHover,
        handleMouseOver,
        handleMouseOut,
    };
};
