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


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'UPLOAD CSV'
    })
})


router.post('/submit', upload.single('csvFile'),(req, res) => {

    const name = req.body.name
    const company = req.body.company

	let fileRows = []

	csv.parseFile(req.file.path, {objectMode: true})
	    .on('error', error => console.error(error))
	    .on('data', (row) => {
		    fileRows.push(row)
	    })
	    .on('end', (count) => {
	    	console.log(`Parsed ${count} rows`)
		    const csv = convertArrayToCSV(fileRows,{ separator: ',' });
		    addEntry("csvFiles", name, company, csv)
			res.redirect('/')
	    })
})


module.exports = router
