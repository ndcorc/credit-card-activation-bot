"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger();
var request = require('request');

module.exports = {


    metadata: function metadata() {
        return {
            "name": "CreditCardImages",
            "properties": {
				"phoneNumber": { "type": "string", "required": true }
			},
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {

		var phoneNumber = conversation.properties().phoneNumber;
		var img_nums, cc_nums, images;
		img_nums, cc_nums, images = [];

		var options = { 
			method: 'GET',
			url: 'http://129.146.81.61:8888/get_images?mobile=' + phoneNumber,
		};
		
		request(options, function (err, res, body) {
			if (err) throw new Error(err);
			console.log(body);
			var data = JSON.parse(body);
			if (data.success) {
				img_nums = data.img_nums;
				cc_nums = data.cc_nums;
				for (var i=0; i<img_nums.length; i++) {
					images.push("https://raw.githubusercontent.com/ndc466/image_bank/master/credit_cards/" + img_nums[i]);
				}
		
				var elements = [];
				for (var i=0; i<images.length; i++) {
					var element = {
						"title": "Select this Card",
						"subtitle": "",
						"image_url": images[i],
						"buttons": [{
							"type": "postback",
							"title": cc_nums[i],
							"payload": cc_nums[i]
						}]
					};
					elements.push(element);
					// conversation.reply(card);
				}
		
				var card =
				{
					"attachment": {
						"type": "template",
						"payload": {
							"template_type": "generic",
							"elements": elements
						}
					}
				};
				conversation.reply(card);
				conversation.keepTurn(true);
				conversation.transition(true);   
			} else {
				conversation.reply({"text": "There seems to have been a problem."})
				conversation.transition();
			}
			done();
		});
		
    }
};
