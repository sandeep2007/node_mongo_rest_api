const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    try {
        const postsList = await Post.find()
        res.status(200).json(postsList)
    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.post('/', async (req, res) => {

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    })

    try {
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    }
    catch (err) {
        res.status(403).json({ message: err })
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.remove({ _id: req.params.id })
        res.status(200).json(post)
    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

router.put('/:id', async (req, res) => {

    try {

        if (req.body.title) {
            await Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } })
        }

        if (req.body.description) {
            await Post.updateOne({ _id: req.params.id }, { $set: { description: req.body.description } })
        }

        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(403).json({ message: err });
    }
})

module.exports = router