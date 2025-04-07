const express = require('express');

const { verifyToken } = require('../utlils/verifyUser');
const CreateListing = require('../controllers/listing.controller');

const router = express.Router();

router.post('/create', verifyToken, CreateListing)

module.exports = router;