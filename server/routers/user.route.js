const express = require('express');
const {test, updateUser, deleteUser} = require('../controllers/user.controller.js');
const { verifyToken } = require('../utlils/verifyUser.js');


const router = express.Router();

router.get('/test', test);
router.post('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);

module.exports = router;