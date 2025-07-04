// tailwind.config.js
module.exports = {
  content: [
    // ... your existing content paths
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
