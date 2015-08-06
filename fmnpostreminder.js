/**
 * Works for post's only, function will be invoked for each request sent from the load test framework
 * use with a command line like :
 *
 *  loadtest --debug -n 1 -c 1 -T application/json -p fmnpostreminder.js 'http://mesos-slave9-qa-uswest2.qasql.opentable.com:31977/v1/reminders'
 *
 */
module.exports = function (requestId) {
  // this object will be serialized to JSON and sent in the body of the request
  var nearFuture = new Date(Date.now() + 120000);

  return {
    "DeliveryUrl": "http://mesos-slave7-qa-uswest2.qasql.opentable.com:31999",
    "GiveupAfter": "",
    "DueAt": nearFuture,
    "MaxRetries": 5,
    "ContentType": "application/json",
    "Encoding": "utf8",
    "Transport": "http",
    "Payload": [123, 34, 109, 101, 115, 115, 97, 103, 101, 34, 58, 32, 34, 105, 32, 110, 101, 101, 100, 32, 116, 111, 32, 98, 101, 32, 100, 101, 105, 108, 118, 101, 114, 101, 100, 33, 34, 125]
  };

};
