
const router = require('express').Router();
const Catalog = require('../models/catalog');

router.get('/', (req, res) => {
  res.render('add_category', {title : 'Add new category'});
});


router.post('/', (req, res) => {
  
  const catalog = new Catalog(req.body);

  catalog.save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err))
  
});

module.exports = router;