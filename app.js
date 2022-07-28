const express = require("express")
const router = require("./routes/main")
const app = express()
const db = require("./models")
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOptions = {
    origin: ['*'],
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(router)
db.sequelize.sync().then(req => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("server running");
    })
});