"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "CheckToAdd",
            "properties": {
                "walletChoice": { "type": "string", "required": true }
            },
            "supportedActions": [ "yes", "no" ]
        };
    },

    invoke: (conversation, done) => {
        var walletChoice = conversation.properties().walletChoice;
        console.log('CheckToAdd: add to wallet option chosen: ' + walletChoice);

        if (walletChoice == "No") {
            conversation.transition("no");
        } else {
            conversation.transition("yes");
        }
        done();
    }
}