const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")


// Get Blog Posts
router.get('/', async (req, res) => {

    const blogs = await config.loadCollection("blog");

    const result = await blogs.find()
        .sort({createdAt: -1})
        .limit(req.body.limit || 0)
        .toArray()

    res.status(200).send(result)
})

// Add Blog Posts
router.post('/', authorize("blog:write"), async (req, res) => {

    const blogs = await config.loadCollection("blog");

    await blogs.insertOne({
            title: req.body.title,
            body: req.body.body,
            createdAt: new Date()
        }
    )
    res.status(201).send();
})

// Delete Blog Posts
router.delete('/', authorize("blog:delete"), async (req, res) => {
    const blogs = await config.loadCollection("blog");
    await blogs.deleteOne({
        _id: new mongodb.ObjectID(req.body.id)
    })

    res.status(200).send();
})


module.exports = router;
