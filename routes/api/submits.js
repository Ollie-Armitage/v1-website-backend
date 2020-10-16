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


    return client.db('Website-Cluster-0').collection('submits');
}

// Get Posts
router.get('/', authorize("submits:read"), async (req, res) => {
    const submits = await loadPostsCollection();
    res.send(await submits.find({}).toArray())
})

// Add Submits
router.post('/', async (req, res) => {
    const submits = await loadPostsCollection();
    await submits.insertOne({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            createdAt: new Date()
        }
    )
    res.status(201).send();
})

// Delete Submits
router.delete('/:id', authorize("submits:delete"), async (req, res) => {
    const submits = await loadPostsCollection();
    submits.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
        })

    res.status(200).send();
})

module.exports = router;
