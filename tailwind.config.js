/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Bao gồm tất cả các tệp HTML và TypeScript trong thư mục src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#77b748",
        primaryBold: "#71ae44",
        main: "#f7f7f7",
        text: "#666",
        textBold: "#484848",
        border: "#dbdbdb",
        primary1: "#93648d",
        primary2: "#4cc3d9",
        primary3: "#7bc8a4",
        primary4: "#f16745",
        textAdmin: "rgb(144,149,163)",
        bgAdmin: "#41485a",
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'], // Thiết lập Open Sans là font chính
      },
    },
  },
  plugins: [],
};
