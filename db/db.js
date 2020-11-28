const AWS = require('aws-sdk')
const moment = require('moment')

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


function addEntry(table, name, company, csv) {
    const params = {
        TableName: table,
        Item: {
            name: {
                S: name
            },
            company: {
                S: company
            },
            csv: {
                S: csv
            },
	        time: {
            	S: moment().toString()
	        }
        }
    }

    DynamoDB.putItem(params, (e) => {
        if (e) {
            console.error("Unable to add entry", e)
        } else {
            console.log(`Added file`)
        }
    })
}

module.exports = {
    addEntry,
    getEntryByKey
}
