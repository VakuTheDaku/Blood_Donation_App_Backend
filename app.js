const express = require("express")
const mainrouter = require("./routes/main")
const path = require("path")
const app = express()
const db = require("./models")
const multer = require("multer")
const { authJwt } = require("./middleware");
const {User} = require("./models")
// require('./routes/auth.routes')(app);

const bodyParser = require('body-parser');
const cors = require("cors");

const corsOptions = {
  origin: ['*', 'http://localhost:3000'],
  credentials: true,
  optionSuccessStatus: 200,
}
const directory = path.resolve(__dirname, 'public', 'assets', 'images')


// const Role=db.roles
// const User=db.User
// function initial() {
//     Role.create({
//       id: 1,
//       name: "user"
//     });

//     Role.create({
//       id: 2,
//       name: "moderator"
//     });

//     Role.create({
//       id: 3,
//       name: "admin"
//     });
//   }

const publicdrc = path.resolve(__dirname, 'public')
app.use(express.static(publicdrc))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/bloodcertificates')
  },
  filename: (req, file, cb) => {

    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})
app.use(bodyParser.json())
app.use(cors(corsOptions))
const upload = multer({ storage }).single('file');
app.use(mainrouter)
require('./routes/user.routes')(app);
app.post('/upload', [authJwt.verifyToken], (req, res) => {
  
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err)
    }
    else{

      console.log(req.file.path)
      User.update({bloodcertificate: req.file.path},{where:{id:req.userId}}).then((user)=>
        {
          console.log(user)
          
        }
        )
      return res.status(200).send(req.file)
    }
    
  })
  console.log(req.file)
});
db.sequelize.sync().then(req => {

  app.listen(process.env.PORT || 5000, () => {
    console.log(publicdrc)
    console.log("server running");
  })
});