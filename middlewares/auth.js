const jwt = require('jsonwebtoken');
 
// On utilise split car il y a 'Bearer' un espace et le token
module.exports= (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       }
	next()
   } catch(error) {
       res.status(401).json({ error })
   }
}