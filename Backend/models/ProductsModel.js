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

export { getProductsDB, getProductDB, postProductDB };
