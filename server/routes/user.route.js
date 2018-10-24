const express = require('express')
const router = express.Router()
const {signup, signin, getAll, getOne,login} = require('../controllers/user.controller')
const {facebook} = require('../controllers/google.controller')
const isLogin = require('../middlewares/isLogin')

router.post('/signup', signup)
router.post('/fb', facebook)
router.post('/signin', signin)
router.get('/one', isLogin, getOne)
router.get('/', getAll)
router.post('/glogin',login)

module.exports = router
