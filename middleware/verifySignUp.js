const db = require("../models");
const ROLES = db.roles;
const User = db.User;
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      name: req.body.username
    }
  }).then(user => {
    if (user) {
        res.send(JSON.stringify({"status": 409, "error": "username already registered", "response": "failed" }));
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.mail
      }
    }).then(user => {
      if (user) {
        res.send(JSON.stringify({"status": 409, "error": "email already registered", "response": "failed" }));
        return;
      }
      next();
    });
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.send(JSON.stringify({"status": 400, "error":"Role doesnt exists", "response": "failed" }));
        return;
      }
    }
  }
  
  next();
};
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;