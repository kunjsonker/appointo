import jwt from 'jsonwebtoken';

// admin authentication middleware

const authAdmin = (req, res, next) => {
    try {

        const {atoken} = req.headers;
        if (!atoken) {
            return res.status(401).json({success:false,message: 'Access denied. No token provided.'});
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success:false,message: 'Invalid token. Access denied.'});
        }
        next();
        
    } catch (error) {
        console.error('Error in admin authentication middleware:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

export default authAdmin;