import { getProductsDB, getProductDB, postProductDB } from '../models/ProductsModel.js';

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

export { getProducts, getProduct, postProduct };
