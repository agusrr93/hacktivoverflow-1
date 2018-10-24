const Category = require('../models/category.model')

module.exports = {

    createOne: (req, res) => {
        Category.create({name: req.body.name})
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAll: (req, res) => {
        Category.find({})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    getById: (req, res) => {
        Category.findById({_id: req.params.id})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    putById: (req, res) => {
        Category.updateOne({_id: req.params.id}, {name: req.body.name})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Category.deleteOne({_id: req.params.id})
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    }
}