import {
  getProductsDB,
  getProductDB,
  postProductDB,
  getOrdersDB,
  deleteProductsDB,
  setFristDB,
  getFristDB,
} from '../models/ProductsModel.js';

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

const postProduct = async (req, res) => {
  const daten = req.body;
  console.log(daten);

  const result = await postProductDB(daten);

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

export { getProducts, getProduct, postProduct, getOrders, deleteProduct, setFrist, getFrist };
