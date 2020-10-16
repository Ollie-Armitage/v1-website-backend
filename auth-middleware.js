const jwt = require("jsonwebtoken")
const config = require('./config.js')


module.exports = (credentials = []) => {
    return (req, res, next) => {
        console.log("Authorization Middleware...")
        // Find JWT in Headers

        if(typeof credentials === "string") credentials = [credentials]


        const token = req.headers['authorization']
        if (!token) return res.status(401).send("Access Denied.")
        else {

            // Validate JWT
            // Removing Bearer
            const tokenBody = token.slice(7)
            jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(`JWT Error: ${err}`)
                    return res.status(401).send("Access Denied.")
                }

                if(credentials.length > 0){
                    if(decoded.scopes &&
                        decoded.scopes.length &&
                        credentials.some(cred => decoded.scopes.indexOf(cred) >= 0)){
                        next()
                    }
                    else{
                        return res.status(401).send("Access Denied.")
                    }
                } else{
                    next()
                }
            })
        }
    }
}
