const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if(err){
            console.log(err);
            data = 'No Chat Exists';
        }

        res.send(`${data}<form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" 
        method="POST">
        <input id="message" type="text" name="message" placeholder="Message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button>
        </form>`
       );
    });
});


app.post("/", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.message);

    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message}`, {flag: 'a'}, (err) =>
        err ? console.log(err) : res.redirect("/") 
    );
})

app.get("/login", (req, res, next) => {
    res.send(`<form action="/login" onsubmit="localStorage.setItem('username', document.getElementById('username').value)" 
    method="POST">
    <input type="text" name="username" placeholder="Username" id="username">
    <button type="submit">Send</button>
    </form>`
    );
});



app.listen(7000);
