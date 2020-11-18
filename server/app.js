
require('dotenv').config();

const express = require("express") // --> dependency
// require('./filepathwayname) --> file

const db = require("./db");

const app = express();

app.use(require('./middleware/headers'));

// app.use(express.static(__dirname + '/public'));
// console.log(__dirname);

// app.get('/', (req, res) => res.render('index'));

// Import controllers as a bundle
const controllers = require("./controllers");


// Parse the body of all requests as JSON
app.use(express.json());

// Setting up "/pies" as an endpoint into my pie controller
app.use("/user", controllers.usercontroller);

app.use(require('./middleware/validateSession'));
// OR
const validateSession = require('./middleware/validateSession');
app.use("/pies", validateSession, controllers.piecontroller)


db.authenticate()
.then(() => db.sync()) // => {force: true}
.then(() => {
    app.listen(process.env.PORT, () => console.log(`[Server: ] App is listening on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
});