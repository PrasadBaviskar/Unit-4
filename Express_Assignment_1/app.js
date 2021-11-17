const users = require("./users")
const express = require('express');
const app  = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome To HomePage")
})


app.get('/users/', (req, res) => {
    res.send(users)
})

app.listen(1234, ()=> {
    console.log("Listening on port 1234")
})