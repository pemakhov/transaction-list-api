const { Router } = require('express');
const TransactionComponent = require('.');

const router = Router();

router.get('/', TransactionComponent.getTransactions);

router.get('/:limit', TransactionComponent.getLastTransactions);

module.exports = router;
