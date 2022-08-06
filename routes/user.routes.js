const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const authorisation = (app) => {
  
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.get(
    "/api/bloodcertificate",
    [authJwt.verifyToken],
    controller.givebirthcertificate
  );
  app.get(
    "/api/getallcertificates",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getallcertificates
  );
  app.post(
    "/api/verify",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.verification
  );
  app.post("/api/createrequest",
  [authJwt.verifyToken, authJwt.isVerified],
  controller.createRequest)
  app.get("/api/showrequests",
  [authJwt.verifyToken, authJwt.isVerified],
  controller.showRequests)
};
module.exports = authorisation