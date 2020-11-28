const express = require('express')
const router = express.Router()

const db = require("../db/db")




const addEntry = db.addEntry
let getAll = db.getAllfromTable


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
    const csv = req.body.csvText

	// const csvFile = req.body.csvFile
	//
	// console.log(csvData)

	addEntry("csvFiles", name, company, csv)

	res.redirect('/')
})




module.exports = router
