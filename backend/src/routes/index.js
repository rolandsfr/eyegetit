const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/version', (req, res) => {
  res.json({version: '0.0.1'})
});


module.exports = router;
