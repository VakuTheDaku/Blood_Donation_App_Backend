const express = require("express")
const mainrouter = require("./routes/main")

const app = express()
const db = require("./models")
// require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOptions = {
    origin: ['*','http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200,
}
const Role=db.roles
const User=db.User
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.use(mainrouter)

db.sequelize.sync().then(req => {
    
    app.listen(process.env.PORT || 5000, () => {
        console.log("server running");
    })
});