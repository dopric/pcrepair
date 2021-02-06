const express = require('express')
const app = express()
const path = require('path')
const {check, validationResult}= require('express-validator')
var session = require('express-session')
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"))
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))


app.get('/', (req, res)=>{
    console.log("try get index")
    const msg = req.session.contactmsg;
    req.session.destroy()
    res.render("index", {message: msg})
})


app.get("/contact", (req, res)=>{
    res.render("contact", {errors: null})
})

app.post("/contact", [
    check('username', "Name field is required")
    .exists().isLength({min: 3})
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.render("contact", {errors: errors.array()})
    }else{
     req.session.contactmsg = `Hi ${req.body.username}, your message has been sent`;
    res.redirect('/')
    }
})

app.listen(3000, function(){
    console.log("server is listening on port 3000")
})