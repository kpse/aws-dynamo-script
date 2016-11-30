const AWS = require('aws-sdk')
const Promise = require('bluebird')

const docClient = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-2'}));

var params = {
    TableName: "dev-louis-test-api-key3"
};

docClient.scanAsync(params).then(res => console.log(JSON.stringify(res, null, 2)));
