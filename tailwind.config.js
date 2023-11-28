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