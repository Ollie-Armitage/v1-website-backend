const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../../config.js')

// Request a token

router.post('/', (req, res) => {

    let payload = {
        name: "Ollie",
        scopes: []
    }

    if(req.body.password === config.adminPassword){
        console.log("Building admin token")
        payload.scopes.push("submits:read")
    }
    else{

    }

    const token = jwt.sign(payload, config.JWT_SECRET)
    res.send(token);
})

module.exports = router
