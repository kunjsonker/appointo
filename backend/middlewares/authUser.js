import jwt from 'jsonwebtoken';

// user authentication middleware

const authUser = (req, res, next) => {
    try {

        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({success:false,message: 'Access denied. No token provided.'});
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = token_decode.id;
        next();
        
    } catch (error) {
        console.error('Error in admin authentication middleware:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

export default authUser;