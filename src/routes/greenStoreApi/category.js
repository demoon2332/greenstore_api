import express from 'express';
const router = express.Router();

// MODELS
import Category from '../../models/greenStoreApi/category.js';
import Product from '../../models/greenStoreApi/product.js';

// SAMPLE DATA
import { getCategorySampleData } from '../../samples/greenStoreApi/category.js';

router.get('/init', async (req, res, next) => {
    try {
        const result = await Category.find({});
        if (!result || result.length === 0) {
            try {
                await Category.insertMany(getCategorySampleData());
                return res.json({ code: 0, message: 'Initialize data successfully.' });
            } catch (err) {
                console.log(err);
                return res.json({ code: 100, message: err.message });
            }
        }
        return res.json({ code: 1, message: 'Category list is not empty' });
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const result = await Category.find({});
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'No data' });
        }
        return res.json({ code: 0, message: "Fetch data from category successfully.", data: result });
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

router.get('/:sn', async (req, res, next) => {
    const sn = req.params.sn;
    try {
        const result = await Product.find({ category_sn: sn });
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'No data' });
        }
        return res.json({ code: 0, message: "Fetch data from category successfully.", data: result });
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

export default router;
