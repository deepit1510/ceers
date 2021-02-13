var MongoClient = require('mongodb').MongoClient
var express = require('express');
const app = express()
const port = 3000
var url = "mongodb://localhost:27017/"
var db

MongoClient.connect(url, function (err, database) {
    if (err) throw err
    console.log("connected to databse")
    db = database
    app.listen(port)
    console.log("Listening on port 3000")
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/universities/:id', (req, res) => {
    var query = { "id": req.params.id }
    var dbo = db.db("ceers");
    dbo.collection("university").find(query).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        res.json(result)
    })
})

app.get('/universities/:id/colleges', (req, res) => {
    //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
    var dbo = db.db("ceers");
    dbo.collection("university").find({ "id": req.params.id }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        res.json(result)
    })
})