/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--color-primary)",
                    dark: "var(--color-primary-dark)",
                    light: "var(--color-primary-light)",
                },
                secondary: {
                    DEFAULT: "var(--color-secondary)",
                    dark: "var(--color-secondary-dark)",
                    light: "var(--color-secondary-light)",
                },
                tertiary: {
                    DEFAULT: "var(--color-tertiary)",
                    dark: "var(--color-tertiary-dark)",
                    light: "var(--color-tertiary-light)",
                },
                neutral: {
                    DEFAULT: "var(--color-neutral)",
                    dark: "var(--color-neutral-dark)",
                    medium: "var(--color-neutral-medium)",
                    light: "var(--color-neutral-light)",
                    lightest: "var(--color-neutral-lightest)",
                    white: "var(--color-neutral-white)",
                },
                error: {
                    DEFAULT: "var(--color-error)",
                    dark: "var(--color-error-dark)",
                    light: "var(--color-error-light)",
                },
                success: {
                    DEFAULT: "var(--color-success)",
                    dark: "var(--color-success-dark)",
                    light: "var(--color-success-light)",
                },
                danger: {
                    DEFAULT: "var(--color-error)",
                    dark: "var(--color-error-dark)",
                    light: "var(--color-error-light)",
                },
                warning: {
                    DEFAULT: "var(--color-warning)",
                    dark: "var(--color-warning-dark)",
                    light: "var(--color-warning-light)",
                },
                background: {
                    light: "var(--color-background-light)",
                    dark: "var(--color-background-dark)",
                    card: {
                        light: "var(--color-background-card-light)",
                        dark: "var(--color-background-card-dark)",
                    },
                },
                "text-base": {
                    light: "var(--color-text-base-light)",
                    dark: "var(--color-text-base-dark)",
                },
            },
            fontFamily: {
                body: ["var(--font-family-body)"],
            },
        },
    },
    plugins: [],
};
