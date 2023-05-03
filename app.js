const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

//* PASOS PARA CREAR RUTAS
// 1. Crear la ruta sin nada dentro
// 2. Crear una vista con una estructura base (sin contenido)
// 3. Rendereizar la vista en la ruta y la probamos
// 4. Buscar la data
// 5. Renderizar la data en el hbs {{}}

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(response => {
      /* console.log(response); */
      res.render('beers.hbs', {
        allBeers: response
      });
    })
    .catch(error => {
      /* console.log(error); */
    });
});

app.get("/random-beer",(req,res)=>{
  punkAPI.getRandom()
  .then(response => {
    console.log(response);
    res.render('random-beer.hbs', {
      randomBeer: response,
      
    });
  })
  .catch(error => {
    console.log(error);
  });
})

app.get("/beers/:id",(req,res)=>{
  const beer1 = punkAPI.getBeer(req.params.id)
  .then((response)=>{
    console.log(response)
    res.render("eachBeer.hbs",{
      beerInfo:response,
    })
  })
  .catch(error => {
    console.log(error);
  });
})

//* PORT LISTENER
app.listen(3000, () => console.log('🏃‍ on port 3000'));
