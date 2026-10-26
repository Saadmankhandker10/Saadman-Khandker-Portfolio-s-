// Tailwind theme for the portfolio. Used only by build-css.ps1 to generate assets/tailwind.css;
// the live site never loads Tailwind at runtime.
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', '"Hind Siliguri"', 'sans-serif'],
                serif: ['"Cormorant Garamond"', '"Instrument Serif"', '"Hind Siliguri"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', '"Hind Siliguri"', 'monospace'],
            },
            colors: {
                studio: {
                    bg: '#07070c',
                    surface: '#0c0c14',
                    crimson: '#e11d48',
                    rose: '#ff2a5f',
                    muted: '#a1a1aa',
                    dim: '#71717a'
                }
            }
        }
    }
};
