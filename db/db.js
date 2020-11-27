const AWS = require('aws-sdk')

AWS.config.update({
    region: "us-east-2"
})

const DynamoDB = new AWS.DynamoDB()

function createTable(tableName) {
    const params = {
        TableName: tableName,
        KeySchema: [{
            AttributeName: "title",
            KeyType: "HASH"
        }],
        AttributeDefinitions: [{
            AttributeName: "title",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 10,
            WriteCapacityUnits: 10
        }
    }

    DynamoDB.createTable(params, (e, data) => {
        if (e) {
            console.error("Unable to create table", e)
        } else {
            console.log('Created Table', data)
        }
    })
}

function getEntryByKey(tableName, key) {
    let items = []
    const params = {
        TableName: tableName,
        Key: {
            title: {
                S: key
            }
        }
    }
    DynamoDB.getItem(params, (e, data) => {
        if (e) {
            console.error("Unable to find movie")
        } else {
            items = data.Item

        }
    })
    return items
}


function addEntry(table, city, country, latitude, longitude, dateVisited, notes) {
    const params = {
        TableName: table,
        Item: {
            title: {
                S: city
            },
            latitude: {
                N: latitude
            },
            longitude: {
                N: longitude
            },

            country: {
                S: country
            },
            dateVisited: {
                S: dateVisited
            },


        }
    }

    DynamoDB.putItem(params, (e) => {
        if (e) {
            console.error("Unable to add entry", e)
        } else {
            console.log(`Added country`)
        }
    })
}


function getAllfromTable(table) {
    let items = []
    const params = {
        TableName: table
    }
    DynamoDB.scan(params, (e, data) => {
        if (e) {
            console.error("Unable to find movies", e)
        } else {
            console.log(`Found ${data.Items} movies`)
            items = data.Items

        }
    })
    return items
}


// function deleteEntry(tableName, title) {
//     const params = {
//         TableName: tableName,
//         Key: {
//             title: {
//                 S: title
//             }
//         }
//     }

//     DynamoDB.deleteItem(params, (e) => {
//         if (e) {
//             console.error("Unable to  find movie", e)

//         } else {
//             console.log(`Deleted ${ title }`)
//         }
//     })
// }

module.exports = {
    createTable,
    addEntry,
    getEntryByKey,
    getAllfromTable
}