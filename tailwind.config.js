const { themeColors } = require("./theme.config");

const tailwindColors = Object.fromEntries(
  Object.entries(themeColors).map(([name, swatch]) => [
    name,
    {
      DEFAULT: `var(--color-${name})`,
      light: swatch.light,
      dark: swatch.dark,
    },
  ]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./lib/**/*.{js,ts,tsx}",
    "./hooks/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        // Additional luxury brand colors
        'luxury-black': '#0A0A0A',
        'luxury-white': '#FFFFFF',
        'luxury-gold': '#D4AF37',
        'luxury-dark-gold': '#B8860B',
        'luxury-light-gold': '#FFD700',
      },
      backgroundColor: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("light", ':root:not([data-theme="dark"]) &');
      addVariant("dark", ':root[data-theme="dark"] &');
    }),
  ],
};
