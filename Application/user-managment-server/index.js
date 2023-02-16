const express = require('express');
const jwt = require('jsonwebtoken');
const port = 5000;
const secretKey = "somethingstrange";
const bodyParser = require('body-parser')
const sql = require('mysql');
const { json } = require('body-parser');

const app = express()
var jsonParser = bodyParser.json()


app.get('/api/', jsonParser, (req, res) => {
    res.json({
        message: "A sample API"
    })
})

app.post('/api/login/', jsonParser, (req, res) => {
    var user = req.body;
    console.log(user);
    var query = "SELECT * FROM person WHERE email = '" + req.body.email + "'";
    var con = sql.createConnection({
        host: "localhost",
        user: "collegeadmin",
        password: "admin",
        database: "college"
    });
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(user.email);
        if (result.length === 0) return res.send("Account doesn't exist");
        user = result[0];
        if (result != undefined && result[0].email === req.body.email) {
            if (result[0].password === req.body.password) {
                jwt.sign({ user }, secretKey, { expiresIn: '1000s' }, (err, token) => {
                    if (err) console.log(err);
                    ROLE = result[0].role;
                    res.json({
                        token: token,
                        user: result[0]
                    })
                })
            } else {
                res.send("Wrong Password");
            }
        }
        else {
            res.send("Account doesn't exist");
        }
    });
})

app.post('/api/data/', jsonParser, (req, res) => {
    var query = "SELECT * FROM result WHERE prn = '" + req.body.prn + "'";
    var con = sql.createConnection({
        host: "localhost",
        user: "teacher",
        password: "teacher",
        database: "college"
    });
    con.query(query, function (err, result) {
        if (err) throw err;
        if (typeof result === 'undefined') return res.send("Error")
        if (result.length === 0) return res.send("No data available");
        return res.send(result);
    });
    con.end();
})

app.post('/api/update/', jsonParser, (req, res) => {
    var query = "UPDATE result set " + req.body.sub + " = " + req.body.mark + " where id = " + req.body.id;
    var con = sql.createConnection({
        host: "localhost",
        user: "teacher",
        password: "teacher",
        database: "college"
    });
    con.query(query, function (err, result) {
        if (err) throw err;
        if (typeof result === 'undefined') return res.send("Error")
        if (result.length === 0) return res.send("No data available");
        return res.send("Successfully updated.");
    });
    con.end();
})


app.post('/api/profile/', jsonParser, verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, async (err, authData) => {
        if (err) {
            console.log(err);
            return res.send({ result: "Login page" })
        } else {
            console.log(authData.user.role);
            if (authData.user.role === 'Student') {
                var con = sql.createConnection({
                    host: "localhost",
                    user: "student",
                    password: "student",
                    database: "college"
                });
                var query = "SELECT * FROM result WHERE prn = '" + authData.user.prn + "'";
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                    if (typeof result === 'undefined') res.send("Error")
                    if (result.length === 0) return res.send("No data available");
                    return res.json({ marks: result[0], message: "Profile accessed", result: authData });
                });
                con.end();
            }
            else if (authData.user.role === 'Teacher') {
                var con = sql.createConnection({
                    host: "localhost",
                    user: "teacher",
                    password: "teacher",
                    database: "college"
                });
                var query = "SELECT * FROM result WHERE prn = '" + req.body.prn + "'";
                con.query(query, function (err, result, fields) {
                    if (err) throw err;
                    console.log(result);
                    if (typeof result === 'undefined') return res.send("Error")
                    if (result.length === 0) return res.send("No data available");
                    return res.send({ marks: result[0], message: "Profile accessed", result: authData });
                });
                con.end();
            }
            else if (authData.user.role === 'Admin') {

            }
        }
    })
})

function verifyToken(req, res, next) {
    console.log(req);
    // const token = req.headers["authorization"];
    const token = req.body.headers.authorization;
    console.log(token);
    if (typeof token !== 'undefined') {
        req.token = token;
        next()
    } else {
        res.send({
            result: "Token is not valid"
        })
    }
}

app.listen(port, () => {
    console.log("App is runnint at port : " + port);
})