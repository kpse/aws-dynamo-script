const AWS = require('aws-sdk')
const _ = require('lodash')

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'ap-southeast-2'
});

const params = {
  TableName: 'xxx-users'
};

docClient.scan(params).promise()
.then(res => {
  const allItems = res.Items;
  console.log("item in all: \n", JSON.stringify(allItems, null, 2))
  // _.each(allItems, i => docClient.putAsync(update(i)))
})
.catch(err => console.log('err', err))


const update = (item) => {
  return {
    TableName: params.TableName,
    Item: _.assign({}, item, {
      active: true
    })
  }
}
const withActive = (p, key) => _.assign({}, p, {
  IndexName: 'dev_key-index',
  KeyConditionExpression: 'dev_key = :key',
  ExpressionAttributeValues: {
    ':key': key
  }
})

docClient.query(withActive(params, 'adas')).promise()
.then(data => _.filter(data.Items, _.matches({active: true})))
.then(res => {
  console.log("found one: \n", JSON.stringify(_.get(res, '[0].name', 'default value'), null, 2))
})
.catch(err => console.log('have not found one : err is ', err))
