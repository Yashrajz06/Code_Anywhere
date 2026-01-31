import type { Config } from 'tailwindcss';

export default {
    content: [
        "./*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#2463eb",
                "background-light": "#f6f6f8",
                "background-dark": "#111621",
                "card-light": "#ffffff",
                "card-dark": "#1e293b",
                "border-light": "#e5e7eb",
                "border-dark": "#334155",
                "editor-bg": "#1E1E1E", // Added from editor.html
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"], // Added from editor.html
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
} satisfies Config;
