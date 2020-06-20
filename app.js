const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));



const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/idcardDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.get('/', function (req, res) {
   res.render('index.ejs')
});

app.get('/dashboard', (req, res) => {
   res.render('dashboard.ejs');
});


app.get('/apply', function (req, res) {
   res.render('apply');
});

const accountSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email: String,
   password: String

});

const User = mongoose.model("User", accountSchema);


app.post("/signup", (req, res) => {
   let myUser = new User(req.body);
   myUser.save()
      .then(item => {
         res.send("item saved to database");
      })
      .catch(err => {
         res.status(400).send("unable to save to database");
      });
   console.log(myUser);
});



app.get("/register", function (req, res) {
   res.render("register");
});

var profileSchema = new mongoose.Schema({
   firstName: String,
   middleName: String,
   lastName: String,
   dob: String,
   gender: String,
   email: String,
   phoneno: String,
   address: String,
   city: String,
   state: String,
   img: String,
});


var Member = mongoose.model("Member", profileSchema);

app.post("/register", (req, res) => {
   const userProfile = new Member(req.body);
   userProfile.save()
      .then(item => {
         res.send("Congratulations! your application is completed");
      })
      .catch(err => {
         res.status(400).send("unable to save to database");
      });
   console.log(userProfile);
});



app.listen(3000, function () {
   console.log("the server started on port 3000");
});