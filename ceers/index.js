// var MongoClient = require('mongodb').MongoClient
// //var mongo = require('mongodb')
// var express = require('express');
// var bodyParser = require('body-parser')
// var cors = require('cors')
// const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(cors())
// const port = 3002
// var url = "mongodb://localhost:27017/"
// var db

// MongoClient.connect(url, function (err, database) {
//     if (err) throw err
//     console.log("connected to databse")
//     db = database
//     app.listen(port)
//     console.log("Listening on port 3002")
// })

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.get('/universities/:id', (req, res) => {
//     var query = { "id": req.params.id }
//     var dbo = db.db("CEERS");
//     dbo.collection("university").find(query).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })

// app.get('/boards/:id', (req, res) => {
//     var query = { "board_id": req.params.id }
//     var dbo = db.db("CEERS");
//     dbo.collection("boards").find(query).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })

// app.get('/universities/:id/colleges', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var dbo = db.db("CEERS");
//     dbo.collection("university").find({ "id": req.params.id }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })

// app.get('/boards/:id/schools', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var dbo = db.db("CEERS");
//     dbo.collection("boards").find({ "board_id": req.params.id }, { fields: { 'schools': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })

// app.post('/universities', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var uni = req_body.universities
//     var dbo = db.db("CEERS");
//     dbo.collection("university").insertMany(uni, function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })

// app.post('/boards', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var boards = req_body.boards
//     var dbo = db.db("CEERS");
//     dbo.collection("boards").insertMany(boards, function (err, result) {
//         if (err) throw err
//         console.log(result)
//         res.json(result)
//     })
// })



// app.post('/universities/:id/colleges', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var colgs = req_body.colleges
//     var dbo = db.db("CEERS");
//     dbo.collection("university").find({ "id": "ID0001" }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         result.forEach(function (r) {
//             console.log(r)
//             r.colleges.forEach(function (ex_colg) {
//                 console.log(ex_colg)
//                 colgs.push(ex_colg)
//             })
//         })
//         var uniQry = { "id": req.params.id }
//         var newValues = { $set: { "colleges": colgs } }
//         dbo.collection("university").updateMany(uniQry, newValues, function (err, result) {
//             if (err) throw err
//             //console.log(result)
//             res.json(result)
//         })
//     })
// })

// app.post('/boards/:id/schools', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var schools = req_body.schools
//     var dbo = db.db("CEERS");
//     dbo.collection("boards").find({ "board_id": req.params.id }, { fields: { 'schools': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         result.forEach(function (r) {
//             console.log(r)
//             r.schools.forEach(function (ex_school) {
//                 console.log(ex_school)
//                 schools.push(ex_school)
//             })
//         })
//         var brdQry = { "board_id": req.params.id }
//         var newValues = { $set: { "schools": schools } }
//         dbo.collection("boards").updateMany(brdQry, newValues, function (err, result) {
//             if (err) throw err
//             //console.log(result)
//             res.json(result)
//         })
//     })
// })

// app.post('/boards/:id/schools/:sch_id/streamsOfferred', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var streams = req_body.streams_offerred
//     var dbo = db.db("CEERS");
//     var sch_id = req.params.sch_id
//     dbo.collection("boards").find({ "board_id": req.params.id, "schools.school_id": req.params.col_id }, { fields: { 'schools': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         result.forEach(function (r) {
//             console.log(r)
//             r.schols.forEach(function (s) {
//                 if (s.school_id == sch_id) {
//                     console.log(s)
//                     s.streams_offerred.forEach(function (ex_streams) {
//                         console.log(ex_streams)
//                         streams.push(ex_streams)
//                     })
//                 }
//             })
//         })
//         var boardQry = { "board_id": req.params.id, "school.school_id": req.params.sch_id }
//         var newValues = {
//             $set: {
//                 "schools.$[elem].streams_offerred": streams 
//             }
//         }
//         var options = { multi:true,arrayFilters: [{ "elem.school_id": sch_id }] }
//         dbo.collection("boards").updateMany(boardQry, newValues, options, function (err, result) {
//             if (err) throw err
//             //console.log(result)
//             res.json(result)
//         })
//     })
// })

// app.post('/universities/:id/colleges/:col_id/coursesOfferred', (req, res) => {
//     //var query = [{ "id": req.params.id }, { fields: { 'colleges': 1 } }]
//     var req_body = req.body
//     var courses = req_body.courcesOfferred
//     var dbo = db.db("CEERS");
//     var col_id = req.params.col_id
//     dbo.collection("university").find({ "id": "ID0001", "colleges.regId": req.params.col_id }, { fields: { 'colleges': 1 } }).toArray(function (err, result) {
//         if (err) throw err
//         console.log(result)
//         result.forEach(function (r) {
//             console.log(r)
//             r.colleges.forEach(function (c) {
//                 if (c.regId == col_id) {
//                     console.log(c)
//                     c.courcesOfferred.forEach(function (ex_courses) {
//                         console.log(ex_courses)
//                         courses.push(ex_courses)
//                     })
//                 }
//             })
//         })
//         var uniQry = { "id": req.params.id, "colleges.regId": req.params.col_id }
//         var newValues = {
//             $set: {
//                 "colleges.$[elem].courcesOfferred": courses 
//             }
//         }
//         var options = { multi:true,arrayFilters: [{ "elem.regId": col_id }] }
//         dbo.collection("university").updateMany(uniQry, newValues, options, function (err, result) {
//             if (err) throw err
//             //console.log(result)
//             res.json(result)
//         })
//     })
// })
