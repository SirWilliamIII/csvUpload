var express = require('express');
var router = express.Router();
const nodeGeocoder = require('node-geocoder');


const db = require("../db/db")


const addEntry = db.addEntry
    // const getByName = db.getEntryByKey
let getAll = db.getAllfromTable
    // const createTable = db.createTable


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'PLACES'
    });
});

router.get('/places', function(req, res, next) {

    let data = {}
    res.render('places', {
        title: 'PLACES',
        place: getAll("place")
    });
});



router.post('/submit', (req, res) => {

    const city = req.body.city
    const country = req.body.country
    const date = req.body.date
    const notes = req.body.notes

    if (req.body.password == "will") {
        let options = {
            provider: 'openstreetmap'
        }

        let geoCoder = nodeGeocoder(options)

        const place = city + ", " + country

        geoCoder.geocode(place)


        .then(res => {
                const lat = res[0].latitude
                const lng = res[0].longitude
                    // const today = new Date()
                addEntry('place', req.body.city, req.body.country, lat.toString(), lng.toString(), date.toString(), notes.toString())
            })
            .catch(e => {
                console.log(e)
            })


        // console.log('City: ' + req.body.city)
        // console.log('Password: ' + req.body.country)
        res.redirect('/')
    }
})




module.exports = router;