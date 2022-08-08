const { User, re } = require("../models");
const db = require("../models");

const request = db.request
const Op = db.Sequelize.Op;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.givebirthcertificate = (req, res) => {
  User.findByPk(req.userId).then((user) => {
    if (user.birthcertificate !== null) {

      return res.send(JSON.stringify({ "status": 200, "error": null, "data": user.bloodcertificate }))
    }
    else {
      return res.send(JSON.stringify({ "status": 404, "error": "no birth certificate provided", "data": null }))
    }
  })

}
exports.getallcertificates = (req, res) => {
  User.findAll({ where: { bloodcertificate: { [Op.ne]: null } } }).then(user => {

    function filterFunction(user) {

      return [user.id, user.bloodcertificate, user.isverified]

    }
    const data = user.map(filterFunction)
    console.log(data)
    return res.send(JSON.stringify({ "status": 200, "error": null, "data": data }))
  })

}
exports.verification = (req, res) => {
  console.log(req.body)
  if (req.body.id) {
    User.update({ isverified: 1 }, { where: { id: req.body.id } }).then((user) => {
      return res.send(JSON.stringify({ "status": 200, "error": null, "data": "verified" }))
    }
    )
  }
  else {
    return res.send(JSON.stringify({ "status": 400, "error": "no req body", "data": "not verified" }))
  }
}
exports.createRequest = (req, res) => {
  console.log(req.body)
  User.findByPk(req.userId).then(async (user) => {
    const ispresent = await  user.getRequest({ UserId: req.userId})
    if(ispresent){
      res.send(JSON.stringify({message: "Request already present"}))
    }
    else{
       user.createRequest({ UserId: req.userId, validity: req.body.validity }).then(() => {
      res.send(JSON.stringify({ message: "Request was registered successfully!" }));
    });
    }
   
  })
}
exports.showRequests = (req, res) => {
  console.log(req.body)
  
  User.findByPk(req.userId).then((user) => {
    if (user.bloodgroup === "B+ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "B+ve" },
                { bloodgroup: "AB+ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "A+ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "A+ve" },
                { bloodgroup: "AB+ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "O+ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "O+ve" },
                { bloodgroup: "A+ve" },
                { bloodgroup: "B+ve" },
                { bloodgroup: "AB+ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "AB+ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "AB+ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "A-ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "A-ve" },
                { bloodgroup: "A+ve" },
                { bloodgroup: "AB+ve" },
                { bloodgroup: "AB-ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "B-ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "AB+ve" },
                { bloodgroup: "B-ve" },
                { bloodgroup: "B+ve" },
                { bloodgroup: "AB-ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "AB-ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "AB+ve" },
                { bloodgroup: "AB-ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
    if (user.bloodgroup === "O-ve") {
      request.findAll().then(async (requests) => {
        function p(element){
          return element.getUser({
            where: {
              [Op.or]: [
                { bloodgroup: "AB+ve" },
                { bloodgroup: "B-ve" },
                { bloodgroup: "B+ve" },
                { bloodgroup: "AB-ve" },
                { bloodgroup: "A-ve" },
                { bloodgroup: "A+ve" },
                { bloodgroup: "O-ve" },
                { bloodgroup: "O+ve" },
              ]
            }
          })
        }
        var availablereceiptients = []
        for (const element of requests) {
          const newele=await p(element)
          availablereceiptients.push(newele)
        };
        console.log(availablereceiptients)
        res.send(JSON.stringify({"status":200,"data":availablereceiptients}))
      })

    }
  }
  )
  
}
