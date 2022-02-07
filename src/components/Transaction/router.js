const { Router } = require('express');
const TransactionComponent = require('.');

const router = Router();

router.get('/', TransactionComponent.getTransactionsByFilter);

router.get('/all', TransactionComponent.getAllTransactions);

router.get('/:limit', TransactionComponent.getLastTransactions);

module.exports = router;
