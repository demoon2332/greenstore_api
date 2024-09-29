import express from 'express';
import Objective from '../../models/okr/objective.js';
import {getObjectiveSampleData} from '../../samples/okr/objective.js';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.end('This is Objective API');
});

router.get('/init', async (req, res) => {
  try {
    const result = await Objective.find({});
    if (!result || result.length === 0) {
      try {
        await Objective.insertMany(getObjectiveSampleData);
        return res.json({ code: 0, message: 'Initialize data successfully.' });
      } catch (err) {
        console.log(err);
        return res.json({ code: 100, message: err.message });
      }
    }
    return res.json({ code: 1, message: 'List is not empty' });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const result = await Objective.find({});
    if (!result) {
      return res.json({ code: 1, message: 'No data' });
    }
    return res.json({ code: 0, message: 'Fetch product successfully', data: result });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

router.post('/add', (req, res) => {
  console.log('POST add objective');
  console.log(req.body);
  return res.json({ code: 100, message: "Something went wrong, we can't add objective." });
});

router.post('/update', (req, res) => {
  console.log('POST update objective');
  console.log(req.body);
  return res.json({ code: 100, message: "Something went wrong, we can't update objective." });
});

router.post('/delete', (req, res) => {
  console.log('POST delete objective');
  console.log(req.body);
  return res.json({ code: 100, message: "Something went wrong, we can't delete objective." });
});

router.get('/:uid', async (req, res) => {
  try {
    const id = req.params.uid;
    console.log('id here: ' + id);
    const result = await Objective.find({ uid: id });
    if (!result) {
      return res.json({ code: 1, message: 'No data' });
    }
    return res.json({ code: 0, message: 'Fetch product successfully', data: result });
  } catch (err) {
    return res.json({ code: 100, message: err.message });
  }
});

export default router;
