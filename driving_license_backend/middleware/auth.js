function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authoautrization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      
      res.json({
        message : 'you are note allowed to ....'
      })
    }

  exports.isAdmin = (req, res, next) => {
      if(req.auth.role == 0){
          return res.status(403).json({
              error: "Admin Ressource, Access Denied"
          })
      }else if(req.auth.role == "Admin"){
        return next()
      }
  }
  exports.isConducteur = (req, res, next) => {
    if(req.auth.role == 0){
        return res.status(403).json({
            error: "Conducteur Ressource, Access Denied"
        })
    }else if(req.auth.role == "Conducteur"){
      return next()
    }
}

  }
  
  
  module.exports = verifyToken;