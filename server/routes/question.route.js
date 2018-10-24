const express = require('express')
const router = express.Router()
const {createOne, getAll, getAllPop, getAllMine, getById, putById, deleteById, upvote, downvote, searchQuestionByTitle} = require('../controllers/question.controller')
const isLogin = require('../middlewares/isLogin')
const isMe = require('../middlewares/isMe')

router.post('/',isLogin, createOne)
router.get('/', getAll)
router.get('/pop', getAllPop)
router.get('/mine', isLogin, getAllMine)
router.get('/:id', getById)
router.put('/:id', isLogin, putById)
router.patch('/:id/vote', isLogin, upvote)
router.patch('/:id/unvote', isLogin, downvote)
router.delete('/:id', isLogin, deleteById)
router.get('/:search/search', searchQuestionByTitle)

module.exports = router