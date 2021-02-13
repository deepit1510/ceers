var MongoClient = require('mongodb').MongoClient
//var mongo = require('mongodb')
var express = require('express');
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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

app.post('/universities', (req, res) => {
    //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
    var req_body = req.body
    var uni = req_body.universities
    var dbo = db.db("ceers");
    dbo.collection("university").insertMany(uni, function (err, result) {
        if (err) throw err
        console.log(result)
        res.json(result)
    })
})



app.post('/universities/:id/colleges', (req, res) => {
    //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
    var req_body = req.body
    var colgs = req_body.colleges
    var dbo = db.db("ceers");
    dbo.collection("university").find({ "id": req.params.id }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        result.forEach(function (r) {
            console.log(r)
            r.colleges.forEach(function (ex_colg) {
                console.log(ex_colg)
                colgs.push(ex_colg)
            })
        })
        var uniQry = { "id": req.params.id }
        var newValues = { $set: { "colleges": colgs } }
        dbo.collection("university").updateMany(uniQry, newValues, function (err, result) {
            if (err) throw err
            //console.log(result)
            res.json(result)
        })
    })
})

app.post('/universities/:id/colleges/:col_id/coursesOfferred', (req, res) => {
    //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
    var req_body = req.body
    var courses = req_body.courcesOfferred
    var dbo = db.db("ceers");
    var col_id = req.params.col_id
    dbo.collection("university").find({ "id": req.params.id, "colleges.regId": req.params.col_id }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        result.forEach(function (r) {
            console.log(r)
            r.colleges.forEach(function (c) {
                if (c.regId == col_id) {
                    console.log(c)
                    c.courcesOfferred.forEach(function (ex_courses) {
                        console.log(ex_courses)
                        courses.push(ex_courses)
                    })
                }
            })
        })
        var uniQry = { "id": req.params.id, "colleges.regId": req.params.col_id }
        var newValues = {
            $set: {
                "colleges.$[elem].courcesOfferred": courses 
            }
        }
        var options = { multi:true,arrayFilters: [{ "elem.regId": col_id }] }
        dbo.collection("university").updateMany(uniQry, newValues, options, function (err, result) {
            if (err) throw err
            //console.log(result)
            res.json(result)
        })
    })
})