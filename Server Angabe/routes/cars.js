const express = require('express');
const {
  getCars,
  deleteCar,
  changeStatusCar,
  addCar,
  getCar,
  // eslint-disable-next-line import/no-unresolved
} = require('../controllers/cars');

const router = express.Router();

router.get('/cars', getCars);
router.patch('/cars/:id', changeStatusCar);
router.delete('/cars/:id', deleteCar);
router.post('/cars', addCar);
router.get('/cars/:id', getCar);

module.exports = router;
