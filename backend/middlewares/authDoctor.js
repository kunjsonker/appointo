import jwt from 'jsonwebtoken';

// doctor authentication middleware

const authDoctor = (req, res, next) => {
    try {

        const {dtoken} = req.headers;
        if (!dtoken) {
            return res.status(401).json({success:false,message: 'Access denied. No token provided.'});
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

        req.docId = token_decode.id;
        next();
        
    } catch (error) {
        console.error('Error in admin authentication middleware:', error);
        res.status(500).json({success:false,message:error.message});
        
    }
}

export default authDoctor;