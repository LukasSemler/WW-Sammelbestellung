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

const postOrderDB = async (order) => {
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

const exportOrdersDB = async () => {
  const { rows } =
    await query(`SELECT p.productnumber                                        as Artikelnummer,
       p.name                                                 as "Bezeichnung Artikel",
       (SELECT name from sizes where oD.fk_size = sizes.s_id) as "Groesse",
       oD.anzahl                                              as "Anzahl",
       p.price
from "order" o
         JOIN "orderDetail" oD on o.o_id = oD.fk_order
         JOIN products p on p.p_id = oD.fk_product`);

  if (rows[0]) {
    const csv = convertArrayOfObjectsToCSV(rows);
    return csv;
  }
  return false;
};

const loginDB = async (email, password) => {
  const { rows } = await query('SELECT * FROM "adminUser" where email = $1 and password = $2;', [
    email,
    password,
  ]);

  if (rows[0]) {
    return rows[0];
  }
  return false;
};

function convertArrayOfObjectsToCSV(data) {
  // Extract column headers from the first object in the array
  const headers = Object.keys(data[0]);

  // Create an array to hold the CSV data
  const csvData = [];

  // Add the header row to the CSV data
  csvData.push(headers.join(','));

  // Iterate through each object and create a CSV row
  data.forEach((item) => {
    const values = headers.map((header) => {
      // Ensure that each value is properly escaped and quoted if necessary
      const escapedValue = item[header].toString().replace(/"/g, '""');
      return `"${escapedValue}"`;
    });
    csvData.push(values.join(','));
  });

  // Join the CSV rows into a single string
  const csvContent = csvData.join('\n');

  return csvContent;
}

const postProductDB = async (
  name,
  artikelNummer,
  farbe,
  preis,
  groessen,
  imageSchicken,
  linkImage,
  category,
) => {
  const db = await pool.connect();
  try {
    // Open Transaction
    await db.query('BEGIN');

    //Zuerst Product erstellen
    const { rows } = await db.query(
      `INSERT INTO products (name, price, explaination, color, productnumber, previewimage, "fk_categories_ID") VALUES 
      ($1, $2, 'Leider gibt es zu diesem Produkt noch keine Beschreibung :(', $3, $4, $5, $6) returning *;`,
      [name, preis, farbe, artikelNummer, linkImage, category.id],
    );

    if (rows[0]) {
      //Dann die Groessen
      for (const groesse of groessen) {
        const { rows: rows2 } = await db.query(
          'INSERT INTO "productsVariation" ("fk_product_ID", "fk_size_ID") VALUES ($1, (SELECT s_id FROM sizes WHERE name = $2)) returning *;',
          [rows[0].p_id, groesse],
        );

        if (!rows2[0]) {
          await db.query('ROLLBACK');
          return false;
        }

        await db.query('COMMIT');
      }

      await db.query('ROLLBACK');
    }
  } catch (error) {
    console.log(error);
    db.query('ROLLBACK');
  } finally {
    await db.release();
  }
};

export {
  getProductsDB,
  getProductDB,
  postOrderDB,
  getOrdersDB,
  deleteProductsDB,
  setFristDB,
  getFristDB,
  exportOrdersDB,
  loginDB,
  postProductDB,
};
