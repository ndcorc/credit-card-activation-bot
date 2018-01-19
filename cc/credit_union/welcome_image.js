"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {

    metadata: function metadata() {
        return {
            "name": "WelcomeImage",
            "properties": {},
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {

        var card =
        {
            "attachment":{
                "type":"template",
                "payload":{
                    "template_type":"generic",
                    "elements": [{
                        "title": "Welcome to Public Service Credit Union",
                        "subtitle": "",
                        "image_url":"https://raw.githubusercontent.com/naresh29s/TestDemo/master/pscu.png"
                    }]
                }
            }
        };
        conversation.reply(card);
        conversation.keepTurn(true);
        conversation.transition(true);
        done();

    }
};