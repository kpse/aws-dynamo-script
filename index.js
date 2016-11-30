const AWS = require('aws-sdk')
const Promise = require('bluebird')
const _ = require('lodash')

const docClient = Promise.promisifyAll(new AWS.DynamoDB.DocumentClient({
  region: 'ap-southeast-2'
}));

const params = {
  TableName: "dev-louis-test-api-key3"
};

docClient.scanAsync(params).then(res => {
  const allItems = res.Items;
  console.log("current: \n", JSON.stringify(allItems, null, 2))
  _.each(allItems, i => docClient.putAsync(update(i)))
});


const update = (item) => {
  return {
    TableName: params.TableName,
    Item: _.assign({}, item, {
      active: true
    })
  }
}
