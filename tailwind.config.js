import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                base: '#FAF8F5',
                surface: '#FFFFFF',
                primary: {
                    light: '#8C6A50',
                    base: '#5C3D2E',
                    dark: '#3A2318',
                },
                accent: {
                    promo: '#D97757',
                },
                text: {
                    main: '#2C1E16',
                    muted: '#7E6A5E',
                },
                success: '#4A7C59',
                warning: '#E2A03F',
            }
        },
    },

    plugins: [forms],
};
