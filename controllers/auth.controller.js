const db = require("../models");
const config = require("../config/auth.config");
const User = db.User;
const Role = db.roles;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const main = (req, res, next) => {
    res.send("Working!!")
}
const insert = (req, res, next) => {
    console.log("working route")
    console.log(req.body)
    
    User.findOne({ where: { email: req.body.mail } }).then(async (users) => {
    let hashedpass =await bcrypt.hash(req.body.password, 8)
    User.create({
        name: req.body.username,
        email: req.body.mail,
        password: hashedpass,
        dob: req.body.date,
        age: req.body.age,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        pincode: req.body.pincode,
        bloodgroup: req.body.blood_group,
        isverified: 0
    })
        .then(user => {
            
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>reached here")
                    console.log(roles)
                    user.setRoles(roles).then(() => {
                       
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    })
}
;
const signin = (req, res) => {
    console.log("worrrking>>>>>>>>>>>>")
    User.findOne({
        where: {
            name: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {

                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                console.log("reached heeeere")
                res.send(JSON.stringify({
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    roles: authorities,
                    accessToken: token,
                    isverified: user.isverified,
                    bloodgroup: user.bloodgroup
                }));
               
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

module.exports = { main: main, insert: insert, signin: signin }