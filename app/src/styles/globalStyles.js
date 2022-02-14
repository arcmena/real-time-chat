import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    ::-webkit-scrollbar{
        width: 4px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: var(--colors-primary-green);
        border-radius: 30px;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
    }

    html {
        font-size: 62.5%;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100%;
        height: 100%;
    }

    html {
        width: 100%;
        height: -webkit-fill-available;
    }

    #root {
        height: 100%;
        background-color: var(--colors-background);
        color: var(--colors-primary-white);

        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    :root {
        --height-title-footer: 19.4rem;
        --height-title: 7.5rem;

        --colors-primary-green: #359271;
        --colors-primary-green-2: #2b775c;
        --colors-primary-gray: #a5b0bd7a;
        --colors-primary-gray-2: #696c6f;
        --colors-primary-gray-3: #909090;
        --colors-primary-white: #e0e0e0;
        --colors-primary-black: #1b1b1b;
        --colors-primary-red: #c50000;
        --colors-background: #202c3d;
        --colors-background-2: #1d293a;
        --colors-backdrop: rgba(0, 0, 0, 0.35);
    }
`
