const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.User;
verifyToken = (req, res, next) => {
  console.log("verifyiiiing")
  let token = req.headers["x-access-token"];
  console.log(req.headers["x-access-token"])
  if (!token) {
    return res.send(JSON.stringify({"status": 403, "error": "no token provided", "response": "failed" }));
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.send(JSON.stringify({"status": 401, "error": "unauthorised", "response": "failed" }));
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.send(JSON.stringify({"status": 403, "error": "require admin role", "response": "failed" }));
      return;
    });
  });
};
isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
        console.log(roles)
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.send(JSON.stringify({"status": 403, "error": "require moderator role", "response": "failed" }));;
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.send(JSON.stringify({"status": 403, "error": "require admin or moderator role", "response": "failed" }));;
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;