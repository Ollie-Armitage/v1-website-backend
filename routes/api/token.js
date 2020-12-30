const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../../config.js')

// Request a token

router.post('/', (req, res) => {

    if(!req.body.password){
        res.status(401).send("Bad Auth Request")
        return;
    }


    let payload = {
        scopes: []
    }

    if(req.body.password === config.adminPassword){
        console.log("Building admin token")
        payload.scopes.push("submits:read")
        payload.scopes.push("submits:delete")
        payload.scopes.push("blog:write")
        payload.scopes.push("blog:delete")
        payload.scopes.push("projects:write")
        payload.scopes.push("projects:delete")
    }
    else{
        res.status(401).send("Bad Auth Request.")
    }

    const token = jwt.sign(payload, config.JWT_SECRET)
    res.status(201).send(token);
})

module.exports = router
