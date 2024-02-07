import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 12px;
        vertical-align: baseline;
    }
    body{
        font-family: Helvetica, Arial, sans-serif;
        background-color: #0e0e0e;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    input, textarea {
        font-family: Helvetica, Arial, sans-serif;
        outline: none;
        border: none;
        br: 0;
    }
`

export default GlobalStyles
