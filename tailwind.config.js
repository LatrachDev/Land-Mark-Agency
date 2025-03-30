import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    primary: '#5d1574',
                    secondary: '#ce6cef',
                    accent: '#a409d7',
                    background: '#f8effb',
                    text: '#130816',
                    half: '#f3f6ff',
                    error: '#f44336',
                    success: '#4caf50',
                },
                dark: {
                    primary: '#d28bea',
                    secondary: '#721093',
                    accent: '#c228f6',
                    background: '#0d0410',
                    text: '#f4e9f7',
                    half: '#1a1e30',
                    error: '#f44336',
                    success: '#4caf50',
                },
            },
            fontFamily: {
                poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
                montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
                jost: ["Jost", "sans-serif"],
            },
        },
    },
    plugins: [],
};
