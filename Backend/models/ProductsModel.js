import { query, pool } from '../DB/index.js';

const getProductsDB = async () => {
  const { rows } = await query(`SELECT
    p.p_id as p_id,
    p.name AS name,
    p.explaination AS explaination,
    p.price AS price,
    p.color AS color,
    p.productnumber AS number,
    p.previewimage as image,
    array_agg(s.name) AS sizes,
    c.name as category
FROM products p
JOIN "productsVariation" pv ON p.p_id = pv."fk_product_ID"
JOIN sizes s on s.s_id = pv."fk_size_ID"
JOIN categories c on p."fk_categories_ID" = c.c_id
GROUP BY p.p_id, c.name
ORDER BY p.p_id;`);

  if (rows[0]) {
    return rows;
  }

  return false;
};

const getProductDB = async (id) => {
  const { rows } = await query(
    `SELECT
    p.p_id as p_id,
    p.name AS name,
    p.explaination AS explaination,
    p.price AS price,
    p.color AS color,
    p.productnumber AS number,
    p.previewimage as image,
    array_agg(s.name) AS sizes,
    c.name as category
FROM products p
JOIN "productsVariation" pv ON p.p_id = pv."fk_product_ID"
JOIN sizes s on s.s_id = pv."fk_size_ID"
JOIN categories c on p."fk_categories_ID" = c.c_id
WHERE p.p_id = $1
GROUP BY p.p_id, c.name
ORDER BY p.p_id;`,
    [id],
  );

  if (rows[0]) {
    return rows[0];
  }

  return false;
};

const postProductDB = async (order) => {
  const db = await pool.connect();
  try {
    // Open Transaction
    await db.query('BEGIN');

    // Insert into order
    const { rows } = await db.query(
      'INSERT into "order" ("vornameEltern", "nachnameEltern", "vornameSpieler", "nachnameSpieler", email, telefonnummer, sum, jahrgang) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *;',
      [
        order.vornameEltern,
        order.nachnameEltern,
        order.vornameSpieler,
        order.nachnameSpieler,
        order.email,
        order.telfonnummer,
        Number(order.summe),
        order.jahrgang,
      ],
    );

    db.query('COMMIT');

    if (!rows[0]) {
      console.log('ROLLBACK');
      await db.query('ROLLBACK');
      return false;
    }

    if (!rows[0]) {
      console.log('ROLLBACK');
      await db.query('ROLLBACK');
      return false;
    }

    console.log(rows[0]);

    for (const product of order.prods) {
      console.log('prod: ', product);
      const { rows: rows2 } = await db.query(
        'INSERT into "orderDetail" (fk_order, fk_product, anzahl, fk_size) VALUES ($1, $2, $3, (SELECT s_id FROM sizes WHERE name = $4)) returning *; ',
        [rows[0].o_id, product.p_id, product.anzahl, product.actualSize],
      );

      console.log('rows2: ', rows2);

      if (!rows2[0]) {
        await db.query('ROLLBACK');
        return false;
      }
    }

    await db.query('COMMIT');
    return true;
  } catch (error) {
    console.log(error);
    db.query('ROLLBACK');
    return false;
  } finally {
    await db.release();
  }
};

const getOrdersDB = async () => {
  const { rows } =
    await query(`SELECT o.o_id                                                 as o_id,
       concat(o."vornameEltern", ' ', o."nachnameEltern")     as eltern,
       concat(o."vornameSpieler", ' ', o."nachnameSpieler")   as spieler,
       o.email,
       o.telefonnummer,
       o.jahrgang,
       o.sum,
       oD.anzahl                                              as anzahl,
       (SELECT name from sizes where oD.fk_size = sizes.s_id) as size,
       p.p_id,
       p.name,
       p.price,
       p.explaination,
       p.color,
       p.productnumber,
       p.previewimage
from "order" o
         JOIN "orderDetail" oD on o.o_id = oD.fk_order
         JOIN products p on p.p_id = oD.fk_product`);

  if (rows[0]) return rows;
  return false;
};

const deleteProductsDB = async (id) => {
  try {
    const { rows: rows } = await query(
      'DELETE FROM "productsVariation" where "fk_product_ID" = $1 returning *;',
      [id],
    );

    if (rows[0]) {
      const { rows: rows2 } = await query('DELETE FROM products where p_id = $1 returning *;', [
        id,
      ]);
      console.log(rows2[0]);

      if (rows2[0]) return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const setFristDB = async (zeitpunkt) => {
  const { rows } = await query('SELECT * FROM info');

  if (rows[0]) {
    const { rows: rows2 } = await query(
      'UPDATE info set zeitpunkt = $1 WHERE i_id = $2 returning *;',
      [zeitpunkt, rows[0].i_id],
    );

    if (rows2[0]) return true;
  } else {
    const { rows } = await query('INSERT INTO info (zeitpunkt) VALUES ($1) returning *;', [
      zeitpunkt,
    ]);

    if (rows[0]) return true;
  }
  return false;
};

const getFristDB = async () => {
  const { rows } = await query('SELECT * FROM info');

  if (rows[0]) return rows;
  return false;
};

export {
  getProductsDB,
  getProductDB,
  postProductDB,
  getOrdersDB,
  deleteProductsDB,
  setFristDB,
  getFristDB,
};
