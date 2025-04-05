const express= require('express');
const { signUp, signIn, google, signOut } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signUp )
router.post('/signin', signIn )
router.post('/google', google )
router.get('/signOut', signOut )

module.exports = router;