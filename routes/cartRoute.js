
const router = require('express').Router();
const Cart = require('../models/cart');


router.get('/', (req, res) => {

  Cart.find({}).sort( { 'created_at' : -1 })
  .then((result) => {
    res.render('cart', { title : 'Cart', products : result});
  })
  .catch((err) => {
    console.log(err);
  })
  
});


module.exports = router;