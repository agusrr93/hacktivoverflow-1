const express = require('express')
const router = express.Router()
const {createOne, deleteById, upvote, downvote,putById} = require('../controllers/answer.controller')
const isLogin = require('../middlewares/isLogin')

router.post('/:question', isLogin, createOne)
router.delete('/:id', isLogin, deleteById)
router.patch('/:id/vote', isLogin, upvote)
router.patch('/:id/unvote', isLogin, downvote)
router.patch('/:id',isLogin,putById)
module.exports = router
