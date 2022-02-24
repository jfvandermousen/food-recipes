const express = require('express')
const { sendFile } = require('express/lib/response')
const app = express()



// register view engines

app.set('view engine', 'ejs');

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.get('/', (req, res) => {
    const recipes =[
        {title:'Vegetables Noodle soup', srcImg:"noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
        {title:'Pastilla', srcImg:"../src/img/pastilla.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
        {title:'Tajine', srcImg:"../src/img/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
        {title:'Donuts', srcImg:"../src/img/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
        {title:'Porc noodle', srcImg:"../src/img/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
        {title:'Noodle soup', srcImg:"../src/img/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
    ]

  res.render('index', { title: 'Home',recipes});
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
  })

  app.get('/recipes/create', (req, res) => {
    res.render('create', { title: 'Create'});
  })

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact'});
})

// redirection 

app.get('/about-me', (req, res) => {
res.redirect('./about')
})


app.use(express.static(__dirname + '/public'));

//404 page

app.use((req,res)=> {
    res.status(404).render('404', { title: '404'})
})

