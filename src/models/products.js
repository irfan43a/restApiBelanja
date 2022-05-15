const pool = require("../config/db");

const select = ({ sortBy, sort, limit, offset, search }) => {
  return pool.query(`SELECT id,name,description,stock,price FROM products WHERE LOWER(name) LIKE LOWER('%${search}%') ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};
const search = (key) => {
  return pool.query(`SELECT id, name,stock,price FROM products WHERE LOWER(name) LIKE LOWER('%${key}%')`);
};
const countProducts = () => {
  return pool.query("SELECT COUNT (*) AS total FROM products");
};
const insert = ({ id_category, name, description, stock, price, photo }) => {
  return new Promise((resolve, reject) => {
    pool.query("INSERT INTO products( id_category, name, description,stock, price,photo)VALUES($1,$2,$3,$4,$5,$6)", [id_category, name, description, stock, price, photo], (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};
const update = (id, name, description, stock, price, id_category) => {
  return pool.query("UPDATE products SET name = $1, description = $2, stock = $3, price = $4 ,id_category = $5  WHERE id = $6", [name, description, stock, price, id_category, id]);
};
const deleteProducts = (id) => {
  return pool.query("DELETE FROM products WHERE id = $1", [id]);
};
const getProductById = (id) => {
  return pool.query("SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1", [id]);
};
module.exports = {
  select,
  insert,
  update,
  search,
  deleteProducts,
  countProducts,
  getProductById,
};
