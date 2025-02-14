const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to authenticate the user
const jwtAuthMiddleware = async (req, res, next) => {
    // Check if the authentication header is present
    const authHeader = req.headers.authorization;
    console.log('authHeader:', authHeader);
    if(!authHeader) {
        return res.status(401).json({error: 'authorization header is required'});
    }
    // Check if the token is present in the headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
        return res.status(401).json({error: 'Unauthorized'});
    }
    try {
        // Verify the token
        const payload = jwt.verify(token, JWT_SECRET);
        // Attach the payload to the request object
        req.user = payload;
        next();
    }catch(err) {
        return res.status(401).json({error: 'Unauthorized'});
    }
}

const generateToken = (userData)=> {
    // Generate a token
    return jwt.sign(userData, JWT_SECRET, {expiresIn: '30000000000'});
}

module.exports = {
    jwtAuthMiddleware,
    generateToken
};