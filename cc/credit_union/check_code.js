"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "CheckCode",
            "properties": {
                "phoneNumber": { "type": "string", "required": true },
                "authCode": { "type": "string", "required": true }
            },
            "supportedActions": [ "valid", "invalid" ]
        };
    },

    invoke: (conversation, done) => {
        var phoneNumber = conversation.properties().phoneNumber;
        var authCode = conversation.properties().authCode;
        logger.debug('CheckCode: checking for user with phone number: ' + authCode);

        var options = { 
            method: 'GET',
            url: 'http://129.146.81.61:8080/check_code?mobile=' + phoneNumber + '&code=' + authCode,
        };

        request(options, function (err, res, body) {
            if (err) throw new Error(err);
            console.log(body);
            var data = JSON.parse(body);
            if (data.success) {
                conversation.transition("valid");
            } else {
                conversation.transition("invalid");
            }
            done();
        });
    }
};
