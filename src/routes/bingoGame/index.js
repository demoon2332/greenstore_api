import express from 'express';
import data_sample from '../../samples/bingoGame/chesses';

const bingoRouter = express.Router();

// model
const chesses = data_sample.getSampleData;

// another

// routes
bingoRouter.get('/', (req, res) => {
    res.render('bingoGame/index');
});

bingoRouter.post('/', (req, res) => {
    res.json(chesses);
});

export default BingoRouter;
