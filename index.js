const express = require('express');
const app = express();
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/login_and_signup');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful');
})

var response = new mongoose.Schema({
    email: String,
    password: String
});
var resp = mongoose.model('resp', response);

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/" + "login.html")
})
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + "/" + "signup.html")
})

app.post('/', async (req, res) => {
    // console.log("login")
    // console.log(req.body)
    // let mydata = new resp(req.body)
    // mydata.
    // resp.findOne({email: req.body.email, password: req.body.password}).then(()=>{
    //     res.send("<h1>Home</h1>")
    // }).catch(()=>{
    //     res.send("<h1>Wrong credentials</h1>")
    // })
    try {
        let check = await resp.findOne({ email: req.body.email })
        if (check.password === req.body.password) {
            // res.send("welcome")
            res.sendFile(__dirname+'/'+'home.html')
        }
        else {
            // res.send(check.password)
            // console.log(check.password)
            // console.log(check)
            // res.send("Invalid password")
            res.sendFile(__dirname+'/'+'wrongpass.html')
            
        }
    }
    catch{
        // res.send("wrong details")
        res.sendFile(__dirname+'/'+'invalid.html')
    }
})
app.post('/signup', (req, res) => {
    // console.log("signup")
    // console.log(req.body)
    let mydata = new resp(req.body)
    mydata.save().then(() => {
        res.send("Signup successful")
    }).catch(() => {
        res.send("Oops! Something went wrong!! Please try again later!!!")
    })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});