const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const config = require('../../config.js')

// Request a token

router.get('/', (req, res) => {
    const payload = {
        name: "Ollie",
        scopes: "submits:read"
    }

    const token = jwt.sign(payload, config.JWT_SECRET)
    res.send(token);
})

module.exports = router
