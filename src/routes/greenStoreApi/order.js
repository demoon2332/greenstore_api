import express from 'express';
const router = express.Router();

// MODELS
import Cart from '../../models/greenStoreApi/cart.js';

router.post('/:uid', async (req, res, next) => {
    const { uid } = req.params;
    try {
        const result = await Cart.find({ cus_id: uid, oid: "" });
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'No data' });
        } else {
            await Cart.updateOne({ cus_id: uid, oid: "" }, { oid: generateRandomID() });
            return res.json({ code: 0, message: 'Payment done' });
        }
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

router.get('/:uid', async (req, res, next) => {
    const { uid } = req.params;
    try {
        const result = await Cart.find({ cus_id: uid, oid: { $nin: "" } });
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'Empty list' });
        }
        return res.json({ code: 0, message: 'Fetch order successfully', data: result });
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

router.get('/:uid/:oid', async (req, res, next) => {
    const { uid, oid } = req.params;
    try {
        const result = await Cart.find({ cus_id: uid, oid: oid });
        if (!result || result.length === 0) {
            return res.json({ code: 1, message: 'Empty list' });
        }
        return res.json({ code: 0, message: 'Fetch order successfully', data: result });
    } catch (err) {
        return res.json({ code: 100, message: err.message });
    }
});

const generateRandomID = () => {
    return Math.floor(Math.random() * 10000000).toString();
};

export default router;
