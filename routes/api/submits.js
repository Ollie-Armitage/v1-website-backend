
const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")

// Get Posts
router.get('/', authorize("submits:read"), async (req, res) => {
    const submits = await config.loadCollection("submits");
    res.send(await submits.find({}).toArray())
})

// Add Submits
router.post('/', async (req, res) => {
    const submits = await config.loadCollection("submits");
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
    const submits = await config.loadCollection("submits");
    submits.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
        })

    res.status(200).send();
})

module.exports = router;
