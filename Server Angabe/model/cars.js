const db = require('../db');

async function getCars() {
  const { rows } = await db.query(
    'SELECT cars.id,title,image,status,price,miles,year_of_make,description,owner,first_name,last_name from cars JOIN owner on cars.owner = owner.id',
  );
  return {
    data: rows,
    code: 200,
  };
}
async function getCar(id) {
  const { rows } = await db.query(
    'SELECT cars.id,title,image,status,price,miles,year_of_make,description,owner,first_name,last_name from cars JOIN owner on cars.owner = owner.id where cars.id= $1',
    [id],
  );
  if (rows.length > 0) {
    return {
      data: rows[0],
      code: 200,
    };
  }
  return {
    data: `Car with the id ${id} not found`,
    code: 404,
  };
}
async function deleteCar(id) {
  const { rows } = await db.query('SELECT * from cars where id = $1', [id]);
  console.log(rows);
  if (rows.length > 0) {
    await db.query('DELETE from cars where id = $1', [id]);
    return {
      data: `Car with the id ${id} deleted`,
      code: 200,
    };
  }
  return {
    data: `Car with the id ${id} was not found`,
    code: 404,
  };
}
async function addCar(body) {
  const searchForOwner = await db.query(
    'SELECT id from owner where first_name = $1 AND last_name = $2',
    [body.owner.firstName, body.owner.lastName],
  );
  const car = await db.query('SELECT Max(id) as max from cars');
  const maxIdCar = car.rows[0].max + 1;

  if (searchForOwner.rows.length > 0) {
    await db.query(
      'INSERT INTO cars(id, title, image, status,price, miles, year_of_make, description, owner ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [
        maxIdCar,
        body.title,
        body.image,
        body.status,
        body.price,
        body.miles,
        body.year_of_make,
        body.description,
        searchForOwner.rows[0].id,
      ],
    );
    return {
      data: `Added Car with the id ${maxIdCar}`,
      code: 200,
    };
  }

  const owner = await db.query(
    'INSERT INTO owner(first_name,last_name ) VALUES ($1,$2) returning id',
    [body.owner.firstName, body.owner.lastName],
  );
  // console.log(owner.rows[0].id);
  // eslint-disable-next-line no-param-reassign

  await db.query(
    'INSERT INTO cars(id, title, image, status,price, miles, year_of_make, description, owner ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
    [
      maxIdCar,
      body.title,
      body.image,
      body.status,
      body.price,
      body.miles,
      body.year_of_make,
      body.description,
      owner.rows[0].id,
    ],
  );
  return {
    data: `Added Car with the id ${maxIdCar} and owner`,
    code: 200,
  };
}
async function changeStatusCar(body, id) {
  const { rows } = await db.query('SELECT * from cars where id= $1', [id]);
  if (rows.length > 0) {
    await db.query('UPDATE cars SET status= $1 where id= $2', [
      body.status,
      id,
    ]);
    return {
      data: `Changed status of car with the id ${id}`,
      code: 200,
    };
  }
  return {
    data: `Car with the id ${id} was not found`,
    code: 404,
  };
}

module.exports = { getCars, deleteCar, addCar, changeStatusCar, getCar };
