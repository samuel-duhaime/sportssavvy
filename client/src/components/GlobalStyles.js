import { createGlobalStyle } from "styled-components";
import { COLORS } from "./constants";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');

    *{
        margin: 0;
        font-family: 'Jost', sans-serif;
    }
    h1, h2, h3{
        color: ${COLORS.green};
    }

    body{
        background-color: ${COLORS.charcoal};

    }
    
    p{
        color: ${COLORS.vanilla};
        margin-top: 10px;
    }
    span{
        color: ${COLORS.vanilla};
    }
`;

export default GlobalStyles;
