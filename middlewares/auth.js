const jwt = require('jsonwebtoken')

 
// On utilise split car il y a 'Bearer' un espace et le token
module.exports= (req, res, next) => {
    console.log('acces token', req.body)
        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log('token:', token)
            const decodedToken = jwt.verify(token,'test')
            console.log('decodedToken:', decodedToken.userId)
            const userId = decodedToken.userId
            console.log('userId:', userId)
            const requestedUserId = req.body.id 
            console.log('requestedUserId:', requestedUserId)

            if (userId !== parseInt(requestedUserId)) {
                return res.status(401).json({ error: 'L\'ID de l\'utilisateur dans le token ne correspond pas à celui dans la requête' });
            }
            req.auth = {
                userId: userId
            }
            next()
        } catch(error) {
            res.status(401).json({ error })
        }
}