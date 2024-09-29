import express from 'express';
const router = express.Router();

// MODELS
import Product from '../../models/greenStoreApi/product.js'

//SAMPLE DATA
import {getProductSampleData} from '../../samples/greenStoreApi/product.js'

/* RETURN CODE TYPE:
  0 : Success
  1 : Error No Data
  100 : Other errors
*/

const sendResponse = (res, code, message, data = null) => {
    return res.json({ code, message, data });
};

router.get('/init', async (req, res) => {
    try {
        const result = await Product.find({});
        if (!result || result.length === 0) {
            await Product.insertMany(getProductSampleData);
            return sendResponse(res, 0, 'Initialize data successfully.');
        }
        return sendResponse(res, 1, 'List is not empty');
    } catch (err) {
        console.error(err);
        return sendResponse(res, 100, err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await Product.find({});
        return sendResponse(res, 0, 'Fetch products successfully', result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 100, err.message);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Product.findOne({ pid: id });
        if (!result) {
            return sendResponse(res, 1, 'No data');
        }
        return sendResponse(res, 0, 'Fetch product successfully', result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 100, err.message);
    }
});

const vnMap = [
    "aáàạãả",
    "eéèẹẽẻêếềệểễ",
    "oóòỏõọôốồổỗộơớờởỡợ",
    "iíìỉĩị",
    "uúùủũụ"
];

router.get('/search/:query', async (req, res) => {
    const { query } = req.params;
    let transformedQuery = query;

    const key = [];
    const term = [];
    
    for (const char of query) {
        for (const vnSet of vnMap) {
            if (vnSet.includes(char)) {
                key.push(char);
                term.push(vnSet);
                break;
            }
        }
    }

    key.forEach((k, index) => {
        transformedQuery = transformedQuery.replace(k, `[${term[index]}]`);
    });

    const regexp = new RegExp(term.join(""));

    try {
        const result = await Product.find({ title: { $regex: transformedQuery, $options: 'i' } })
            .collation({ locale: "vi", strength: 1 });
        if (!result || result.length < 1) {
            return sendResponse(res, 1, 'No data.');
        }
        return sendResponse(res, 0, 'Fetch product successfully.', result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, 100, err.message);
    }
});

export default router;
