const jwt = require('jsonwebtoken');

exports.auth = async function (req, res , next) {
    try {
        let token = req.headers.authorization
        if (!token) return res.status(401).send({ status: false, message: "Missing auth token" })
        token = token.slice(7);


        jwt.verify(token,"e-commerce2",function (err, decodedToken) {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return res.status(401).send({ status: false, message: "invalid auth token" });
                }

                if (err.name === 'TokenExpiredError') {
                    return res.status(401).send({ status: false, message: "auth token expired" });
                } else {
                    return res.send({ msg: err.message });
                }
            } else {
                req.token = decodedToken;
                next();
            }
        });
    }
    catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}