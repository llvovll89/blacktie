import { createGlobalStyle } from 'styled-components';

const ResetStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}    

a {
    text-decoration: none;
}

  ol,
  ul {
    list-style: none;
  }

button, input {
    outline: none;
    border: none;
    font-size: 14px;
    background: transparent;
    cursor: pointer;
}

img {
  max-width: 100%;
  height: auto;
}

// 커스텀 스크롤바
body::-webkit-scrollbar {
  width: 8px;
}

body::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,.46);
  border-radius: 10px;
}

body::-webkit-scrollbar-track {
  background: rgb(34,34,35);
}

`;

export { ResetStyle };
