const express = require('express');
const mongoose = require('mongoose');

const Catalog = require('./models/catalog');
const Cart = require('./models/cart');

const app = express();
const port = 3000;

const categoryRoute = require('./routes/categoryRoute');
const cartRoute = require('./routes/cartRoute');

const dbURI = 'mongodb+srv://rishab:rishab1234@blog-site.fckec.mongodb.net/inventory?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => app.listen(port))
  .catch((err) => console.log('error db'));


app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 


app.get('/', (req, res) => {

  Catalog.find({}).sort( { 'created_at' : -1 })
    .then((result) => {
      res.render('index', { title : 'Home', products : result});
    })
    .catch((err) => {
      console.log(err);
    })
});


app.use('/add-category', categoryRoute);
app.use('/cart', cartRoute);


/**  Items adding to cart / deleting from cart / add a new category **/
app.post('/item/:id', (req, res) => {
  Catalog.findById(req.params.id)
    .then((result) => {
      const item = { name : result.name, description : result.description};

      const cart = new Cart({ name : result.name , description : result.description});
      cart.save()
        .then((result) => res.redirect('/'))
        .catch((err) => console.log('fail to add to cart'));
    })
    .catch((err) => console.log('error in retreiving'));
  
})

app.delete('/item/:id', (req, res) => {
  const id = req.params.id;
  Cart.findByIdAndDelete(id)
    .then((result) => {
      res.json( {redirect : '/cart'});
    })
    .catch((err) => {
      console.log(err);
    })
});


/** 404 page */
app.use((req, res) => {
  res.status(400).render('404', {title : '404'});
})

