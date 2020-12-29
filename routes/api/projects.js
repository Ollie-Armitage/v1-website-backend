
const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")

// Get Projects
router.get('/', async (req, res) => {
    const projects = await config.loadCollection("projects");
    const result = await projects.find()
    res.status(200).send(result)
})

// Add Projects
router.post('/', authorize("projects:write"), async (req, res) => {
    const projects = await config.loadCollection("projects");
    await projects.insertOne({
            title: req.body.title,
            body: req.body.body,
            createdAt: new Date()
        }
    )
    res.status(201).send();
})

// Delete Submits
router.delete('/:id', authorize("project:delete"), async (req, res) => {
    const projects = await config.loadCollection("projects");
    await projects.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })

    res.status(200).send();
})


module.exports = router;
