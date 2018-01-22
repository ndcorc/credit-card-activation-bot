"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "CheckCard",
            "properties": {
                "phoneNumber": { "type": "string", "required": true },
                "cc": { "type": "string", "required": true },
                "cvc": { "type": "string", "required": true },
            },
            "supportedActions": [ "valid", "invalid" ]
        };
    },

    invoke: (conversation, done) => {
        var phoneNumber = conversation.properties().phoneNumber;
        var cc = conversation.properties().cc;
        cc = cc.substr(cc.length-4);
        var cvc = conversation.properties().cvc;
        logger.debug('CheckCode: checking for user with cc having the last four digits: ' + cc);

        var options = { 
            method: 'GET',
            url: 'http://129.146.81.61:8888/check_card?mobile=' + phoneNumber + '&cc=' + cc + '&cvc=' + cvc,
        };
        console.log('http://129.146.81.61:8888/check_card?mobile=' + phoneNumber + '&cc=' + cc + '&cvc=' + cvc);

        request(options, function (err, res, body) {
            if (err) throw new Error(err);
            console.log(body);
            var data = JSON.parse(body);
            if (data.success) {
                var cc_image = data.message["cc_image"];
                conversation.variable("ccImage", cc_image);
                conversation.transition("valid");
            } else {
                conversation.transition("invalid");
            }
            done();
        });
    }
};
