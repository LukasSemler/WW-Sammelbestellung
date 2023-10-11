import { query } from '../DB/index.js';

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

export { getProductsDB, getProductDB };
