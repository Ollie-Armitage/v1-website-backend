const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")


// Get Blog Posts
router.get('/', async (req, res) => {

    const projects = await config.loadCollection("projects");

    const result = await projects.find()
        .sort({createdAt: -1})
        .limit(req.body.limit || 0)
        .toArray()

    res.status(200).send(result)
})

// Add Blog Posts
router.post('/', authorize("projects:write"), async (req, res) => {

    const projects = await config.loadCollection("projects");

    await projects.insertOne({
            title: req.body.title,
            project_id: req.body.project_id,
            subtitle: req.body.subtitle,
            imageLink: req.body.imageLink,
            githubLink: req.body.githubLink,
            description: req.body.description,
            createdAt: new Date()
        }
    )
    res.status(201).send();
})

// Delete Blog Posts
router.delete('/', authorize("projects:delete"), async (req, res) => {
    const projects = await config.loadCollection("projects");
    await projects.deleteOne({
        _id: new mongodb.ObjectID(req.body.id)
    })

    res.status(200).send();
})


module.exports = router;
