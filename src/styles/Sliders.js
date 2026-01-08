import styled from "styled-components";

const SlickContainer = styled.div`
    .slick-slider {
        width: 100%;
        height: max-content; // 슬라이더 높이 조정
        position: relative;

        .slick-list,
        .slick-track {
            height: 500px;
        }

        .slick-prev,
        .slick-next {
            top: -5%;
            z-index: 1;
        }

        .slick-prev {
            left: 90%;
        }

        .slick-prev:before,
        .slick-next::before {
            font-size: 36px;
        }

        .slick-next {
            right: 2%;
        }

        .slick-dots {
            bottom: 0;
        }
    }
`;

const SliderItem = styled.div`
    position: relative;
    min-width: 180px;
    height: 250px;
    color: #fff;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.15s ease-in-out;

    &:hover {
        transform: translateY(-3px);
    }

    &.dark {
        background: rgb(29, 29, 29);
    }

    img {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .average {
        position: absolute;
        left: 4px;
        top: 2px;
        font-size: clamp(10px, 1vw, 12px);
        padding: 0;
        font-weight: bold;
        color: salmon;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1;

        &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 80%;
            border: 2px solid salmon;
            border-radius: 100%;
        }
    }

    .slider_contents {
        width: 100%;
        position: absolute;
        bottom: 0;
        padding: 6px;
        background: rgba(0, 0, 0, 0.56);

        h3 {
            font-size: clamp(12px, 1vw, 14px);
            letter-spacing: 0.02rem;
            font-weight: 700;
            padding: 2px 6px;
        }

        p {
            font-size: clamp(10px, 1vw, 14px);
            display: flex;
            gap: 6px;
            padding-left: 6px;
        }
    }

    @media screen and (max-width: 768px) {
        min-width: 150px;
        height: 235px;

        .slider_contents {
            padding: 3px;

            h3 {
                font-size: 15px;
                letter-spacing: 0;
            }

            p {
                font-size: 14px;
                gap: 6px;
                span {
                    font-size: 15px;
                    padding: 0;
                }
            }
        }
    }

    /* 완전모바일 */
    @media screen and (max-width: 564px) {
        height: 220px;

        .slider_contents {
            padding: 6px 2.5px;

            h3 {
                font-size: 13px;
            }

            p {
                width: 100%;
                font-size: 12.5px;
                padding: 1.5px 6px;
                span {
                    font-size: 13px;
                }
            }
        }
    }
`;

export {SlickContainer, SliderItem};
