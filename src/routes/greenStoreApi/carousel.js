import express from 'express';
import Carousel from '../../models/greenStoreApi/carousel.js';
import carousel_data_sample from '../../samples/greenStoreApi/carousel.js';

const router = express.Router();

router.get('/init', async (req, res, next) => {
  try {
    const result = await Carousel.find({});
    if (!result || result.length === 0) {
      try {
        await Carousel.insertMany(carousel_data_sample.getSampleData);
      } catch (err) {
        console.log(err);
        return res.json({ code: 100, message: err.message });
      }
      return res.json({ code: 0, message: 'Initialize data successfully.' });
    }
    return res.json({ code: 1, message: 'Carousel list is not empty' });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await Carousel.find({});
    if (!result || result.length === 0) {
      return res.json({ code: 1, message: 'No data' });
    }
    return res.json({ code: 0, message: 'Fetch category successfully!', data: result });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

export default router;
