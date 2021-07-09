const mongoose = require('mongoose');
const { Schema }  = mongoose;

const CartSchema = new Schema({
  name : String,
  description : String,
});


const Cart = mongoose.model('Cart', CartSchema, 'cart');

module.exports = Cart;

