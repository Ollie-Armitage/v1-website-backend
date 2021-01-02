
const config = require('../../config')
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const authorize = require("../../auth-middleware")

// Get Posts
router.get('/', authorize("submits:read"), async (req, res) => {
    const submits = await config.loadCollection("submits");
    res.status(200).send(await submits.find({}).toArray())
})

// Add Submits
router.post('/', async (req, res) => {

    if(!req.body.name || !req.body.email || !req.body.subject || !req.body.message){
        res.status(400).send();
        return;
    }

    const submits = await config.loadCollection("submits");
    await submits.insertOne({
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            createdAt: new Date()
        }
    )
    res.status(201).send("Submit Created.");
})

// Delete Submits
router.delete('/', authorize("submits:delete"), async (req, res) => {

    if(!req.body.id){
        res.status(400).send("Bad Request: No ID included.");
        return;
    }

    const submits = await config.loadCollection("submits");
    submits.deleteOne({
        _id: new mongodb.ObjectID(req.body.id)
        })

    res.status(201).send("Submit Deleted.");
})

module.exports = router;
