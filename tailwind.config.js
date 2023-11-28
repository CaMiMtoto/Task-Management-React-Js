/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#1b43ae',
                'info': '#00b7ff',
                'danger': '#ae0505',
                'success': '#0e870e',
                'warning': '#c9a614',
                'secondary': '#f8f9fa',
                'light': '#f8f9fa',
            }
        },
    },
    plugins: [],
    prefix: 'tw-',
    important: true,
    corePlugins: {
        preflight: false,
    }

}