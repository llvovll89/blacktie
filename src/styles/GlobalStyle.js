import styled, {css, keyframes} from "styled-components";
import {Link} from "react-router-dom";

const LogoAnimation = keyframes`
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
`;

const GlobalWrap = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ErrorBox = styled.div`
    display: block;
    width: 100%;
    font-size: 30px;
    color: salmon;
`;

const TrailerContainer = styled.div`
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 12px;
    width: 100%;
    height: 100%;

    .slick-slide {
        margin-right: 20px;
    }

    .splide__arrow {
        height: 2.5em;
        width: 2.5em;
        background: rgba(0, 0, 0, 0.64);
        opacity: 1;

        svg {
            fill: #fff;
        }
    }

    .splide__arrow--next {
        right: 4px;
    }

    .splide__arrow--prev {
        left: 4px;
    }

    .splide__slide {
        min-width: 200px;
    }

    span {
        display: block;
        font-size: 20px;
        padding: 36px 0;
        font-weight: 700;
    }

    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            font-size: 24px;
            padding: 32px 0px 32px 12px;
        }

        .btnBox {
            display: flex;
            gap: 12px;

            button {
                width: 36px;
                height: 36px;
                font-size: 16px;
                color: #fff;
                background: rgba(255, 255, 255, 0.14);
                border-radius: 50%;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .top {
            h2 {
                padding: 26px 0px 26px 12px;
                font-size: 20px;
            }
        }

        .splide__slide {
            min-width: 150px;
        }
    }

    @media screen and (max-width: 564px) {
        padding: 30px 12px;
        .top {
            h2 {
                font-size: 17.5px;
                letter-spacing: 0.018rem;
                padding: 20px 0 20px 12px;
            }
        }

        .splide__arrow {
            height: 2em;
            width: 2em;
            background: #181818;
            opacity: 1;
        }
    }
`;

const Container = styled.div`
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 12px;
    width: 100%;
    height: 100%;

    .slick-slide {
        margin-right: 20px;
    }

    .splide__arrow {
        height: 2.5em;
        width: 2.5em;
        background: rgba(0, 0, 0, 0.64);
        opacity: 1;

        svg {
            fill: #fff;
        }
    }

    .splide__arrow--next {
        right: 4px;
    }

    .splide__arrow--prev {
        left: 4px;
    }

    .splide__slide {
        min-width: 200px;
    }

    span {
        display: block;
        font-size: 20px;
        padding: 36px 0;
        font-weight: 700;
    }

    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
            font-size: 24px;
            padding: 32px 0px 32px 12px;
        }

        .btnBox {
            display: flex;
            gap: 12px;

            button {
                width: 36px;
                height: 36px;
                font-size: 16px;
                color: #fff;
                background: rgba(255, 255, 255, 0.14);
                border-radius: 50%;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .top {
            h2 {
                padding: 26px 0px 26px 12px;
                font-size: 20px;
            }
        }

        .splide__slide {
            min-width: 150px;
        }
    }

    @media screen and (max-width: 564px) {
        padding: 30px 12px;
        .top {
            h2 {
                font-size: 17.5px;
                letter-spacing: 0.018rem;
                padding: 20px 0 20px 12px;
            }
        }

        .splide__arrow {
            height: 2em;
            width: 2em;
            background: #181818;
            opacity: 1;
        }
    }
`;

const DetailPerson = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 964px;
    padding: 76px 12px;

    .content {
        position: relative;
        border-radius: 12px;
        box-shadow: 1px 1px 2.5px rgba(0, 0, 0, 0.11);
        width: 100%;
        height: 400px;
        padding: 12px;
        display: flex;
        justify-content: center;
        gap: 6px;

        &.dark {
            background: #081918;
            color: #fff;
        }

        .splide__arrow {
            height: 2.3em;
            width: 2.3em;
            background: #181818;
            opacity: 1;
            top: 50%;
            transform: translateY(-50%);

            &.splide__arrow--prev {
                left: 3px;
            }

            &.splide__arrow--next {
                right: 3px;
            }

            svg {
                width: 1em;
                height: 1em;
                fill: #fff;
            }
        }

        .left {
            max-width: 300px;
            width: 100%;
            height: 100%;
            box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.11);
            image-rendering: -webkit-optimize-contrast;
            transform: translateZ(0);
            backface-visibility: hidden;

            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
            }
        }

        .right {
            width: 100%;
            max-width: 70%;
            padding: 20px;
            display: flex;
            flex-flow: column;
            justify-content: space-between;

            .title {
                display: flex;
                flex-direction: column;
                gap: 4.5px;

                h1 {
                    font-size: 20px;
                    font-weight: bold;
                }

                .sub {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 16px;

                    .items {
                        padding: 6px;
                        p {
                            text-align: center;
                            font-size: 16px;
                        }

                        span {
                            font-size: 14px;
                        }
                    }
                }
            }

            .credit {
                .cast_contents {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    img {
                        width: 100%;
                        height: 180px;
                        border-radius: 6px;
                        overflow: hidden;
                    }

                    .cast_name {
                        p {
                            word-break: break-all;
                            font-size: 13px;
                        }
                    }
                }
            }
        }

        .close_btn {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #181818;
            color: #fff;
            transition: 0.25s all ease;
            font-size: 20px;

            &:hover {
                background: #fff;
                color: #181818;
            }
        }

        @media screen and (max-width: 768px) {
            flex-flow: column;
            align-items: center;
            height: max-content;
            padding: 16px;

            .left {
                max-width: 300px;
                height: 250px;
            }
            .right {
                max-width: 100%;
                gap: 8px;

                .title {
                    width: 100%;
                    align-items: center;
                    gap: 12px;
                    h1 {
                        font-size: 18px;
                    }
                    .sub {
                        .items {
                            p {
                                font-size: 15px;
                            }

                            span {
                                font-size: 13.5px;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 564px) {
        padding: 36px 12px;

        .content {
            .right {
                gap: 12px;

                .credit {
                    .cast_contents {
                        .cast_name {
                            p {
                                word-break: break-all;
                            }
                        }
                    }
                }
            }
            .close_btn {
                top: 5px;
                right: 5px;
                font-size: 16px;
                width: 30px;
                height: 30px;
            }
        }
    }
`;

const DetailPage = styled.div`
    margin: 0 auto;
    max-width: 964px;
    width: 100%;
    padding: 56px 12px;
    color: #b1b1b1;

    .content {
        position: relative;
        background-color: #181818;
        display: block;
        width: 100%;
        height: 100%;

        .splide__arrow {
            height: 2.2em;
            width: 2.2em;
            background: #181818;
            opacity: 1;
            top: 50%;
            transform: translateY(-50%);

            svg {
                width: 1em;
                height: 1em;
                fill: #fff;
            }
        }

        .slide-wrapper {
            overflow-x: auto;
        }

        .net {
            display: flex;
            flex-flow: row wrap;
            gap: 6px;
            justify-content: center;
            align-items: center;

            .pro_name {
                span {
                    font-size: 16px;
                    color: salmon;
                }
            }
        }

        button {
            position: absolute;
            right: 12px;
            top: 12px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #181818;
            color: #fff;
            transition: 0.25s all ease;
            font-size: 20px;

            &:hover {
                background: #fff;
                color: #181818;
            }
        }

        .top {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: max-content;
            overflow: hidden;

            img {
                /* padding: 24px 0; */
                width: 100%;
                height: 100%;
                max-height: 500px;
                object-fit: fill;

                @media screen and (max-width: 564px) {
                    max-height: 400px;
                }
            }
        }

        .bot {
            padding: 20px;
            display: flex;
            flex-flow: column;
            gap: 12px;

            .title {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 3px;

                h1 {
                    font-size: 20px;
                    font-weight: bold;
                }

                .sub {
                    display: flex;
                    align-items: center;
                    gap: 6px;

                    span {
                        font-size: 16px;
                        padding-right: 6px;
                        border-right: 1px solid rgba(255, 255, 255, 0.11);
                    }
                }
            }

            .cast_contents {
                display: flex;
                flex-flow: column;
                align-items: center;
                gap: 6px;

                img {
                    width: 100%;
                    height: 200px;
                }

                .cast_name {
                    p {
                        font-size: 14px;
                        border-bottom: 0;
                        margin-top: 0;
                        color: rgb(210, 210, 210);
                    }
                }
            }

            .items {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                margin-top: 16px;
                gap: 12px;

                .items_b {
                    .recommended-movies {
                        height: 200px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }

                @media screen and (max-width: 564px) {
                    gap: 8px;
                    .items_t {
                        h3 {
                            font-size: 14.5px;
                        }

                        p {
                            font-size: 13px;
                        }
                    }

                    .items_b {
                        gap: 9px;
                        .recommended-movies {
                            height: 220px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        h3 {
                            font-size: 14.5px;
                        }
                    }
                }

                .items_t {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                    flex-direction: column;

                    p {
                        line-height: 1.35;
                    }
                }

                .items_b {
                    display: flex;
                    flex-flow: column;
                    gap: 12px;
                    padding: 0;
                }
            }

            .non {
                width: 100%;
                padding-top: 12px;
                text-align: center;
            }

            .sub_data {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 6px;

                .sub_item {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    align-items: center;

                    @media screen and (max-width: 564px) {
                        h3 {
                            font-size: 15px;
                        }

                        span {
                            font-size: 13px;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 564px) {
            .splide__arrow {
                height: 1.75em;
                width: 1.75em;
                background: #181818;
                opacity: 1;
                top: 50%;
                transform: translateY(-50%);

                &.splide__arrow--prev {
                    left: 2px;
                }

                &.splide__arrow--next {
                    right: 2px;
                }

                svg {
                    width: 0.8em;
                    height: 0.8em;
                    fill: #fff;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        padding: 28px 12px;
        .content {
            padding: 0;
            gap: 6px;

            .close_btn {
                right: 6px;
                top: 6px;
            }

            .bot {
                padding: 9px;
                gap: 6px;

                .title {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 3px;

                    h1 {
                        font-size: 14.5px;
                        font-weight: bold;
                    }

                    .sub {
                        display: flex;
                        align-items: center;
                        gap: 3px;

                        span {
                            font-size: 12.5px;
                            padding-right: 3.5px;
                            border-right: 1px solid rgba(255, 255, 255, 0.11);
                        }
                    }
                }

                .net {
                    .pro_name span {
                        font-size: 12px;
                    }
                }

                .cast_contents {
                    display: flex;
                    flex-flow: column;
                    align-items: center;
                    width: 100%;
                    gap: 9px;

                    img {
                        width: 100%;
                        height: 100%;
                        max-width: 250px;
                        max-height: 200px;
                    }

                    .cast_name {
                        width: 100%;
                        display: flex;
                        flex-flow: column;
                        align-items: center;

                        p {
                            font-size: 13.5px;
                            border-bottom: 0;
                            line-height: inherit;
                            margin-top: 0;
                            color: rgb(210, 210, 210);
                        }
                    }
                }
            }
        }
    }
`;

const Content = styled.div`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        object-fit: middle;
        transition: transform 0.2s ease;
    }
    h2 {
        font-size: 14px;
    }
    p {
        font-size: 12px;
    }
`;

const HeaderContainer = styled.header`
    position: fixed;
    width: 100%;
    height: 56px;
    display: flex;
    background: #ffffff;
    color: #000;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: background-color, box-shadow 0.15s linear;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &.dark {
        background: #000000;
        color: #ffffff;
    }

    .search_bar {
        position: absolute;
        height: 46px;
        top: 100%;
        left: -100%;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &.open {
            display: flex;
            padding: 0 16px;
            width: 100%;
            top: 100%;
            left: 0;
            opacity: 1;
            z-index: 100;
            align-items: center;
            justify-content: center;
            transition: all 0.1s ease-in;
            background: transparent;
            background: #4fd2b2;

            form {
                display: flex;
                width: 100%;
                height: 100%;
                max-width: 1400px;
                margin: 0 auto;

                input {
                    width: 100%;
                    height: 100%;
                    padding: 0 20px;
                    font-size: 18px;
                    flex: 1 1 80%;
                    color: #fff;

                    &::placeholder {
                        color: #fff;
                    }
                }

                .close_btn {
                    color: #fff;
                    flex: 1 1 20%;
                    font-size: 20px;
                }
            }

            @media screen and (max-width: 564px) {
                & {
                    form {
                        input {
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }

    .logo {
        a {
            font-size: 25px;
            color: skyblue;
            letter-spacing: 0.05rem;
            font-weight: bold;
            text-shadow: 0 0 15px skyblue 0 0 25px;
            cursor: pointer;
            animation: ${LogoAnimation} 3s linear infinite;
        }
    }

    .navbar {
        padding: 0 12px;
        display: flex;
        align-items: center;
        gap: 16px;

        .search,
        .dark_btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            margin: 0 7px;
        }

        .toggle {
            position: relative;
            display: none;
            font-size: 20px;
            overflow: hidden;
            cursor: pointer;
            margin: 0 3px;
        }

        .contents {
            display: flex;
            gap: 16px;
            align-items: center;
            height: 100%;

            .dropdown {
                position: relative;
                display: inline-block;

                &.off {
                    display: none;
                }

                &:hover .dropdown-content {
                    display: block;
                }

                .dropdown-btn,
                a {
                    display: block;
                    width: 100%;
                    padding: 9px 18px;
                }

                .dropdown-content {
                    padding: 6px;
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    border-color: rgba(0, 0, 0, 0.15);
                    background-color: rgb(41, 42, 45);
                    transform: translateX(-50%);
                    min-width: 140px;
                    z-index: 100;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.03),
                        0 4px 5px 0 rgba(0, 0, 0, 0.04);

                    a,
                    span {
                        color: #ffffff;
                        padding: 9px;
                        text-decoration: none;
                        display: block;
                        font-size: clamp(12px, 1.25vw, 14px);
                    }

                    a:hover,
                    span:hover,
                    a:focus,
                    span:focus {
                        background: rgba(255, 255, 255, 0.1);
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        padding: 0 12px;
        .logo {
            a {
                font-size: 22px;
                letter-spacing: 0.15rem;
            }
        }

        .navbar {
            flex-direction: row-reverse;
            gap: 12px;

            .toggle {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }

            .contents {
                position: absolute;
                right: -100%;
                opacity: 0;

                &.open {
                    min-width: 200px;
                    height: max-content;
                    top: 76px;
                    right: 0;
                    opacity: 1;
                    z-index: 1000;
                    flex-direction: column;
                    transition: all 0.35s linear;
                    padding: 16px;
                    border-bottom-left-radius: 12px;
                    box-shadow: rgba(229, 237, 237, 0.088) 0px 1px 0px 1px;

                    .dropdown {
                        width: 100%;
                        text-align: center;

                        .dropdown-btn,
                        a {
                            display: block;
                            width: 100%;
                            padding: 20px 16px;

                            &:hover {
                                background: rgba(0, 0, 0, 0.03);
                            }
                        }
                        .dropdown-content {
                            flex-direction: column;
                            top: 50%;
                            left: -20px;
                            min-width: 160px;

                            a,
                            span {
                                padding: 6px;
                                text-decoration: none;
                                display: block;
                                font-size: 15px;
                            }
                        }

                        .dropdown.on {
                            display: block;
                        }
                    }
                }
            }
        }

        @media screen and (max-width: 564px) {
            height: 56px;

            .logo a {
                font-size: 22px;
            }

            .navbar {
                .toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }

                .contents {
                    &.open {
                        top: 56px;
                    }
                }
            }
        }
    }
`;

const Section = styled.section`
    position: relative;
    padding-top: 56px;
    min-height: calc(100vh - 180px);
    transition: padding-left 0.15s ease;
    background: #ffffff;
    color: #000;
    transition: background-color 0.15s linear;

    &.dark {
        background: #1e1f21;
        color: #ffffff;
    }

    .loader_section {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .items {
        padding: 20px 20px 0px 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
            font-size: 20px;
        }
        span {
            font-weight: 600;
            font-size: 22px;
            color: salmon;
        }

        .filter {
            position: relative;
            &::after {
                position: absolute;
                content: "";
                top: 50%;
                right: 10px;
                transform: translateY(-50%) rotate(180deg); /* 회전 */
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid white;
            }
            select {
                width: 150px;
                padding: 10px;
                background: #202123;
                border: 1px solid rgba(0, 0, 0, 0.11);
                color: #fff;
                outline: none;
                font-size: 14px;
                appearance: none;
                cursor: pointer;

                &:focus {
                    border: 1px solid rgba(255, 255, 255, 0.11);
                }

                option {
                    background: transparent;
                    border-radius: 0;
                    border: none;
                }
            }
        }
    }

    .non_page {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        width: 100%;
        padding: 20px;
        /* border: 1px solid rgba(255,255,255,0.16); */
        h1,
        p {
            display: block;
            width: 100%;
            text-align: center;
        }

        h1 {
            padding: 16px 0;
            font-size: 40px;
            letter-spacing: 0.03rem;
            color: #fe5493;
        }

        p {
            font-size: 20px;
            padding: 3px 0;
        }
    }

    @media screen and (max-width: 768px) {
        gap: 12px;

        .items {
            padding: 16px 0px 0px 0px;
            flex-flow: column wrap;
            gap: 8px;

            p {
                font-size: 15px;
                span {
                    font-size: 16px;
                }
            }

            .filter select {
                width: 125px;
                padding: 8px;
                background: #202123;
                border: 1px solid rgba(0, 0, 0, 0.11);
                color: #fff;
                outline: none;
                font-size: 13px;
            }
        }

        .non_page {
            position: relative;
            width: 100%;
            /* border: 1px solid rgba(255,255,255,0.16); */

            h1 {
                padding: 16px 0;
                font-size: 26px;
                letter-spacing: 0.03rem;
                color: #fe5493;
            }

            p {
                font-size: 14px;
                padding: 3px 0;
            }
        }
    }

    #page-numbers {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        color: #fff;
        padding: 12px;
        width: 100%;

        li {
            padding: 6px 20px;
            background: #08f;
            cursor: pointer;
        }
    }

    .person_filter {
        padding-top: 26px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        .filter_btn {
            background: #4fd2b2;
            color: #fff;
            padding: 9px 16px;
            letter-spacing: 0.015rem;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
            overflow: hidden;
            transition: transform 0.15s ease-in-out;

            &:hover {
                transform: scale(1.05);
            }
        }
    }

    @media screen and (max-width: 768px) {
        padding: 76px 0;

        .filter {
            padding-top: 12px;

            .filter_btn {
                padding: 7px 14px;
            }
        }
    }

    @media screen and (max-width: 564px) {
        padding: 56px 0;
    }
`;

const SearchForm = styled.form`
    max-width: 100%;
    padding: 6px;
    display: flex;
    justify-content: space-between;

    input {
        flex: 1 1 90%;
        width: 100%;
        height: 38px;
        background: #141414;
        font-size: 14px;
        padding: 0 12px;
        color: #fff;
    }

    button {
        flex: 1 1 10%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        background: #141414;
        cursor: pointer;
        color: #fff;
    }

    @media screen and (max-width: 768px) {
        width: 100%;

        button {
            flex: 1 1 15%;
            font-size: 16px;
        }
    }
`;

const TopArrow = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: fixed;
    bottom: 4%;
    right: 2%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;

    background: ${(props) => (props.$dark ? "#292a2d" : "#f1f1f1")};
    color: ${(props) => (props.$dark ? "#f1f1f1" : "#292a2d")};

    @media screen and (max-width: 768px) {
        width: 36px;
        height: 36px;
        bottom: 10%;
    }
`;

const Card = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-flow: column wrap;
    color: #fff;
    background: rgb(29, 29, 29);
    overflow: hidden;
    cursor: pointer;

    border-radius: 12px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);

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

    .contents {
        position: relative;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        width: 100%;
        height: 300px;
        transition: 0.15s transform linear;
        overflow: hidden;
        &:hover {
            transform: translateY(-2%);
        }

        .top {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .bot {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 6px 0;
            background: rgba(0, 0, 0, 0.76);
            p {
                padding: 2.5px 6px;

                span {
                    color: salmon;
                }
            }
            .title {
                font-weight: 600;
            }
            .date {
                line-height: 1;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.66);

                span {
                    font-size: 16px;
                    color: salmon;
                }
            }

            .date span {
                font-size: 15px;
                color: #fff;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .contents {
            width: 100%;
            height: 280px;
            &:hover {
                transform: translateY(-1.5%);
            }

            .bot {
                padding: 4px 0;
                p {
                    padding: 3px 6px;
                    font-size: 13px;
                }
                .title {
                    font-size: 15px;
                }
                span {
                    font-size: 14px;
                }

                .date {
                    line-height: 1;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.66);

                    span {
                        font-size: 14px;
                        color: salmon;
                    }
                }

                .date {
                    display: flex;
                    flex-direction: column;
                    span {
                        font-size: 13.5px;
                        color: #fff;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 564px) {
        .contents {
            width: 100%;
            height: 250px;
            &:hover {
                transform: translateY(-1.2%);
            }

            .bot {
                padding: 3.5px 0px 3.5px 4px;
                p {
                    padding: 2.5px 4px;
                    font-size: 12.5px;
                }
                .title {
                    font-size: 14px;
                }
                span {
                    font-size: 13px;
                }

                .date {
                    line-height: 1;
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.66);

                    span {
                        font-size: 14px;
                        color: salmon;
                    }
                }

                .date {
                    display: flex;
                    flex-direction: column;
                    span {
                        font-size: 13.5px;
                        color: #fff;
                    }
                }
            }
        }
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 30px 16px;
    margin: auto;
    max-width: 1280px;
    width: 100%;
    height: auto;
    gap: 30px;
`;

const Results = styled.div`
    padding: 26px;
    max-width: 1280px;
    min-height: 500px;
    width: 100%;
    height: auto;
    margin: auto;
    gap: 16px;

    ${({$isLoading}) =>
        $isLoading
            ? css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
              `
            : css`
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);

                  @media screen and (max-width: 1024px) {
                      grid-template-columns: repeat(3, 1fr);
                      gap: 12px;
                  }

                  @media screen and (max-width: 768px) {
                      padding: 12px;
                      grid-template-columns: repeat(2, 1fr);
                      gap: 9px;
                  }
              `}
`;

const FooterContainer = styled.footer`
    width: 100%;
    display: flex;
    padding: 0px 0px 12px 0px;
    gap: 12px;
    flex-flow: column wrap;
    align-items: center;
    height: 180px;
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    transition: background-color 0.15s linear;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    &.dark {
        background: #1e1f21;
        color: #fff;
    }

    .top {
        padding: 16px;
        width: 100 %;
        text-align: center;
        a {
            color: #fff;
            padding: 0 20px;
        }
    }

    .links {
        width: 100 %;
        text-align: center;
        padding: 6px 0;
        a,
        button {
            padding: 0 16px;
            color: #8c8888;
        }
    }

    .contents {
        width: 100 %;
        text-align: center;
        p {
            line-height: 1.5;
            font-size: 13px;
            color: #8c8888;
        }
    }

    @media screen and(max-width: 768px) {
        gap: 8px;

        .top {
            a {
                font-size: 14px;
            }
        }

        .links {
            a {
                font-size: 13px;
            }
        }

        .contents {
            p {
                font-size: 11.5px;
            }
        }
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 30px 0;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 24px 0;
        gap: 16px;
    }
`;

const PaginationButton = styled.button`
    padding: 12px 20px;
    background: #1de9b6;
    color: #fff;
    border-radius: 3px;

    @media screen and(max-width: 768px) {
        padding: 9px 16px;
    }
`;

export {
    Section,
    GlobalWrap,
    Container,
    Content,
    ErrorBox,
    HeaderContainer,
    SearchForm,
    TopArrow,
    DetailPage,
    Card,
    Results,
    FooterContainer,
    PaginationContainer,
    PaginationButton,
    SearchContainer,
    DetailPerson,
    TrailerContainer,
};
