// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    if(req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        const token = req.headers.authorization.split(' ')[1];
        if(token == null) {
          return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              return res.status(401).json({ message: 'Unauthorized: Token expired' });
            }
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
          } else {
            req.user = decoded;
            next();
          }
        });
    } else {
        res.sendStatus(401);
    }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }  
};

module.exports = {
  verifyToken
};
