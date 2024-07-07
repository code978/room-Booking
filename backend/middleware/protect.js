const jwt = require('jsonwebtoken')

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        token = token.split(' ')[1];
        let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken;
    } else {
        return res.status(404).json({
            status: true,
            message: `please login first.`
        })
    }

    next();
}

