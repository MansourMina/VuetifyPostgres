const asyncHandler = require('express-async-handler');

const carModel = require('../model/cars');

const getCars = asyncHandler(async (req, res) => {
  const { data, code } = await carModel.getCars();
  res.status(code).json(data);
});

const getCar = asyncHandler(async (req, res) => {
  const { data, code } = await carModel.getCar(req.params.id);
  res.status(code).json(data);
});

const deleteCar = asyncHandler(async (req, res) => {
  const { data, code } = await carModel.deleteCar(req.params.id);
  res.status(code).json(data);
});

const addCar = asyncHandler(async (req, res) => {
  const { data, code } = await carModel.addCar(req.body);
  res.status(code).json(data);
});
const changeStatusCar = asyncHandler(async (req, res) => {
  const { data, code } = await carModel.changeStatusCar(
    req.body,
    req.params.id,
  );
  res.status(code).json(data);
});
module.exports = { getCars, deleteCar, addCar, changeStatusCar, getCar };
