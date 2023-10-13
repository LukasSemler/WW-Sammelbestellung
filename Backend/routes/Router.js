/* eslint-disable import/extensions */
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getProducts, getProduct, postProduct, getOrders } from '../controllers/ProductsController.js';


const router = express.Router();

router.get('/test', (req, res) => {
  return res.status(200).send('OK');
});

router.get('/products', asyncHandler(getProducts));
router.get('/products/:id', asyncHandler(getProduct));

router.post('/orders', asyncHandler(postProduct));
router.get('/orders', asyncHandler(getOrders));

export default router;
