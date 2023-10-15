import {
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
} from '../models/ProductsModel.js';

import fs from 'fs';
import path from 'path';

const dirname = path.resolve();

const getProducts = async (req, res) => {
  const result = await getProductsDB();

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await getProductDB(id);

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const postOrder = async (req, res) => {
  const daten = req.body;
  console.log(daten);

  const result = await postOrderDB(daten);

  if (result) return res.status(200).json(result);
  return res.status(500).send('Error');
};

const getOrders = async (req, res) => {
  const result = await getOrdersDB();

  const test = convertArrayOfObjectsToCSV(result);
  console.log(test);

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const result = await deleteProductsDB(id);

  if (result) return res.status(200).send('Product wurde erfolgreich gelöscht');
  return res.status(500).send('Fehler beim Löschen des Products');
};

function convertArrayOfObjectsToCSV(data) {
  const array = typeof data !== 'object' ? JSON.parse(data) : data;
  let csv = '';

  // Extract the column headers
  const headers = Object.keys(array[0]);

  // Append the column headers to the CSV string
  csv += headers.join(',') + '\n';

  // Loop through the array of objects
  for (let i = 0; i < array.length; i++) {
    let row = [];

    // Loop through the object properties and push them to the row array
    for (const header of headers) {
      row.push(array[i][header]);
    }

    // Join the row array into a CSV string, and append it to the CSV variable
    csv += row.join(',') + '\n';
  }

  return csv;
}

const setFrist = async (req, res) => {
  const { zeitpunkt } = req.body;
  console.log(zeitpunkt);

  const result = await setFristDB(zeitpunkt);

  if (result) return res.status(200).send('Frist wurde erfolgreich gesetzt');
  return res.status(500).send('Fehler beim setzen der Frist');
};

const getFrist = async (req, res) => {
  const result = await getFristDB();

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const exportOrders = async (req, res) => {
  const result = await exportOrdersDB();

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await loginDB(email, password);

  if (result) return res.status(200).json(result);
  return res.status(500).send('Internal Server Error');
};

const postProductImage = async (req, res) => {
  try {
    const { titel, datentyp } = req.body;

    console.log('Titel: ' + titel, '| Datentyp: ' + datentyp);

    const uniqueImageName = path.join(dirname, `public/images/${titel}.${datentyp}`);
    //schauen ob das Bild schon existiert, wenn ja löschen und neu erstellen
    if (fs.existsSync(`${dirname}/public/images/${titel}.${datentyp}`)) {
      fs.unlinkSync(`${dirname}/public/images/${titel}.${datentyp}`);
    }

    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong');
  }
};

const postProduct = async (req, res) => {
  const { name, artikelNummer, farbe, preis, groessen, imageSchicken, linkImage, category } =
    req.body;

  const result = await postProductDB(
    name,
    artikelNummer,
    farbe,
    preis,
    groessen,
    imageSchicken,
    linkImage,
    category,
  );

  console.log(req.body);
};

export {
  getProducts,
  getProduct,
  postOrder,
  getOrders,
  deleteProduct,
  setFrist,
  getFrist,
  exportOrders,
  login,
  postProductImage,
  postProduct,
};
