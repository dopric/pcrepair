const express = require('express')
const app = express()
const path = require('path')
const {check, validationResult}= require('express-validator')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/node_modules/bootstrap/dist"))
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"))


app.get('/', (req, res)=>{
    res.render("index", {message: undefined})
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
    res.render("index", {message: `Hi ${req.body.username}, your message has been sent`})
    }
})

app.listen(3000, function(){
    console.log("server is listening on port 3000")
})