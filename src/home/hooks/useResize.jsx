import {useState, useEffect, useCallback} from "react";

export const useResize = () => {
    const [perPage, setPerPage] = useState(5);
    const [gap, setGap] = useState("16px");

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 1280) {
            setPerPage(5);
        } else if (window.innerWidth >= 924) {
            setPerPage(4);
            setGap("8px");
        } else if (window.innerWidth >= 628) {
            setPerPage(3);
            setGap("10px");
        } else {
            setPerPage(2);
            setGap("12px");
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    return {
        perPage,
        gap,
    };
};
