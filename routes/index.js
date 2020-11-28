const express = require('express')
const router = express.Router()
const { EOL } = require('os');
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');


const multer = require('multer')
const csv = require('@fast-csv/parse')

const upload = multer({dest: 'tmp/csv/'})

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



router.post('/submit', upload.single('csvFile'),(req, res) => {

    const name = req.body.name
    const company = req.body.company


	let fileRows = []


	csv.parseFile(req.file.path, {objectMode: true})
	    .on('error', error => console.error(error))
	    .on('data', (row) => {
	    	// console.log(`ROW=${row}`)
		    fileRows.push(row)
	    })
	    .on('end', (rowCount) => {
	    	console.log(`Parsed ${rowCount} rows`)
		    const csvFromArrayOfObjects = convertArrayToCSV(fileRows,{ separator: ',' });
		    addEntry("csvFiles", name, company, csvFromArrayOfObjects)
			res.redirect('/')
	    })


})


module.exports = router
