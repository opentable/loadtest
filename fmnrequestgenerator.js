/**
 * Will generate a random mix of posting reminders and looking them up by tag. Use with a command line like :
 *
 *  loadtest -t 10 --rps 1 -c 1 -R fmnrequestgenerator.js 'http://mesos-slave3-qa-uswest2.qasql.opentable.com:31855'
 *
 */

var randomTag = '';

var generateRequest = function (params, options, client, callback) {

    if (Math.random() < .5) {
        return sendPostRequest(options, client, callback);
    } else {
        return sendGetRequest(options, client, callback);
    }

};

function sendPostRequest(options, client, callback) {
    var path = '/v1/reminders';
    var method = 'POST';

    var request = createRequest(options, client, path, method, callback);

    var nearFuture = new Date(Date.now() + 120000);

    randomTag = createRandomString(15);
    //console.log('randomTag : %s, length : %d', randomTag, randomTag.length);

    var message = {
        "DeliveryUrl": "amqp://guest:guest@10.21.0.177:15672/%2f?exchange=HA-OT.Reservation.v1",
        "GiveupAfter": "",
        "DueAt": nearFuture,
        "MaxRetries": 5,
        "ContentType": "application/json",
        "Encoding": "utf8",
        "Transport": "http",
        "Tag": randomTag,
        "Payload": [123, 34, 109, 101, 115, 115, 97, 103, 101, 34, 58, 32, 34, 105, 32, 110, 101, 101, 100, 32, 116, 111, 32, 98, 101, 32, 100, 101, 105, 108, 118, 101, 114, 101, 100, 33, 34, 125]
    };

    request.write(JSON.stringify(message));
    return request;
}

function sendGetRequest(options, client, callback) {
    //var path = '/service-status';
    var path = '/v1/reminders/active-by-tag/' + randomTag;
    var method = 'GET';

    return createRequest(options, client, path, method, callback);

}

function createRequest(options, client, path, method, callback) {
    //console.log('method : ', method);

    options.pathname = path;
    options.path = path;
    options.method = method;

    options.headers['Content-Type'] = 'application/json';

    var request = client(options, callback);
    return request;

}

function createRandomString(length) {
    var random = Math.random().toString().substr(2);
    if (!(length || length === 0)) {
        return random;
    } else if (random.length >= length) {
        return random.substr(0, length);
    } else {
        return random + createRandomString(length - random.length);
    }
}

module.exports = generateRequest;


