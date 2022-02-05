const { Router } = require('express');
const TransactionComponent = require('.');

const router = Router();

router.get('/', TransactionComponent.test);

module.exports = router;
