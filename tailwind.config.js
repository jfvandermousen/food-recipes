module.exports = {
  content: ["./src/**/*.{html,js}","./src/index.html",'./pages/**/*.{html,js}',
  './components/**/*.{html,js}',],
  theme: {
    extend: {
      colors:{
        primary: '#FF6363',
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
      }
    },
    fontFamily: {
      body: ['Nunito Sans']
    }
  },
  plugins: [],
}
}