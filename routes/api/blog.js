const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")


async function loadPostsCollection() {

    const client = await mongodb.MongoClient.connect(config.dblink, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    return client.db('Website-Cluster-0').collection('blog');
}

// Get Posts
router.get('/:monthsback', async (req, res) => {
    const blogs = await loadPostsCollection();
    const result = await blogs.find()
        .sort({createdAt: -1})
        .limit(3)
        .skip(parseInt(req.params.monthsback))
        .toArray()

    res.status(200).send(result)
})

// Add Blog Posts
router.post('/', authorize("blog:write"), async (req, res) => {

    const blogs = await loadPostsCollection();

    await blogs.insertOne({
            title: req.body.title,
            body: req.body.body,
            createdAt: new Date()
        }
    )
    res.status(201).send();
})

// Delete Submits
router.delete('/:id', authorize("blog:delete"), async (req, res) => {
    const blogs = await loadPostsCollection();
    await blogs.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })

    res.status(200).send();
})


module.exports = router;
