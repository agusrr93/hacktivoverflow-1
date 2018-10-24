const express = require('express')
const router = express.Router()

const users = require('./user.route')
const categories = require('./category.route')
const questions = require('./question.route')
const answers = require('./answer.route')

router.use('/users', users)
router.use('/categories', categories)
router.use('/questions', questions)
router.use('/answers', answers)

router.get('/', function(req, res) {
  res.send('AGUS RANDHANI - HACKTIV-OVERFLOW API')
})

module.exports = router