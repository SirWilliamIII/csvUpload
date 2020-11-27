const express = require('express')
const router = express.Router()

const db = require("../db/db")


const addEntry = db.addEntry
    const getByName = db.getEntryByKey
let getAll = db.getAllfromTable
    const createTable = db.createTable


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'UPLOAD CSV'
    })
})

router.get('/data', function(req, res, next) {

    let data = {}

    res.render('csv', {
        title: 'CSV',
        place: getAll("csv")
    })
})



router.post('/submit', (req, res) => {

    const name = req.body.name
    const company = req.body.company
    const csv = req.body.csv

	addEntry("csvFiles",name,company, csv)
        res.redirect('/')
})




module.exports = router
