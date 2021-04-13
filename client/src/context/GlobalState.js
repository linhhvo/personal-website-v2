import React, {createContext, useReducer, useState, useLayoutEffect} from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    theme: 'dark',
    projectScroll: false,
    profileSlide: false,

    switchTheme: () => { },
    toggleProfilePanel: () => { }
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({children}) => {
    // Set up switch theme functionality
    const [theme, setTheme] = useState('dark');

    useLayoutEffect(() => {
        /* If user has never visited the website, theme value in their localStorage = null
        => use OS color scheme to populate initial theme and store it in localStorage
        If user has previously visited the website, use theme value in localStorage to set theme
        */

        const prevTheme = localStorage.getItem('theme');
        const OSDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

        if (prevTheme === 'dark') {
            setTheme('dark');
            document.getElementById('main').classList.replace('light', 'dark');
        } else if (prevTheme === 'light') {
            setTheme('light');
            document.getElementById('main').classList.replace('dark', 'light');
        } else {
            if (OSDarkMode.matches) {
                setTheme('dark');
                document.getElementById('main').classList.replace('light', 'dark');
            } else {
                setTheme('light');
                document.getElementById('main').classList.replace('dark', 'light');
            }
        }
    });

    // Switch theme function to allow toggle theme with light bulb icon
    const switchTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    // Show/hide profile panel on mobile view
    const toggleProfilePanel = () => {
        dispatch({
            type: 'SLIDE_PROFILE'
        });
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <GlobalContext.Provider
            value={{
                theme: state.theme,
                projectScroll: state.projectScroll,
                profileSlide: state.profileSlide,
                switchTheme,
                toggleProfilePanel
            }}>
            {children}
        </GlobalContext.Provider>);
};