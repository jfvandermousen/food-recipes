module.exports = {
  content: ["./views/**/*.{html,js}","./views/index.html",'./pages/**/*.{html,js}',
  './components/**/*.{html,js}',],
  theme: {
    extend: {
      colors:{
        primary: '#FF6363',
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
      },
      title: '#6cc24a',
    },
    fontFamily: {
      body: ['Nunito Sans']
    }
  },
  plugins: [],
}
}