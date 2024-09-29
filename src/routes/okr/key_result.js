import express from 'express';
import KeyResult from '../../models/okr/key_result.js';
import objective from '../../models/okr/objective.js';
import {getKeyResultSampleData} from '../../samples/okr/key_result.js';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.end('This is Key Result API');
});

router.get('/init', async (req, res) => {
  try {
    const result = await KeyResult.find({});
    if (!result || result.length === 0) {
      try {
        await KeyResult.insertMany(o_data_sample.getSampleData);
        return res.json({ code: 0, message: 'Initialize data successfully.' });
      } catch (err) {
        console.log(err);
        return res.json({ code: 100, message: err.message });
      }
    }
    return res.json({ code: 1, message: 'List Key Result is not empty' });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

router.get('/:uid', async (req, res) => {
  try {
    const result = await KeyResult.find({ oid: req.params.uid });
    if (!result) {
      return res.json({ code: 1, message: 'No data' });
    }
    return res.json({ code: 0, message: 'Fetch product successfully', data: result });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

router.post('/add', (req, res) => {
  console.log('POST add key result');
  console.log('Authentication header');
  console.log(req.header('Authorization'));
  console.log(req.body);
  const item = req.body.item;
  const newKeyResult = new KeyResult({
    oid: req.body.oid,
    uid: '123',
    name: item.name,
    status: 1,
    createdAt: item.createdAt
  });
  newKeyResult.save();
  return res.json({ code: 0, message: 'Create item successfully.' });
});

router.post('/update', (req, res) => {
  console.log('POST update key result');
  console.log(req.body);
  return res.json({ code: 100, message: "Something went wrong, we can't update the user." });
});

router.post('/delete', (req, res) => {
  console.log('POST delete key result');
  console.log(req.body);
  return res.json({ code: 100, message: "Something went wrong, we can't delete the user." });
});

export default router;
