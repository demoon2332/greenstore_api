import express from 'express';
import {getBingoSampleData} from '../../samples/bingoGame/chesses.js';

const bingoRouter = express.Router();

// model
const chesses = getBingoSampleData;

// another

// routes
bingoRouter.get('/', (req, res) => {
    res.render('bingoGame/index');
});

bingoRouter.post('/', (req, res) => {
    res.json(chesses);
});

export default bingoRouter;
