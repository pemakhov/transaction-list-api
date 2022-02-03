const { Router } = require('express');
const TransactionComponent = require('.');

const router = Router();

router.get('/', TransactionComponent.getLatestBlockTransactions);

router.get('/dump', TransactionComponent.getInitialTransactionDump);

module.exports = router;
