const mongoose = require('mongoose');
const { Schema }  = mongoose;

const CatalogSchema = new Schema({
  name : String,
  description : String,
});


const Catalog = mongoose.model('Catalog', CatalogSchema, 'catalogs');

module.exports = Catalog;

