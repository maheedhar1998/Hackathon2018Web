$(function() {

	// chat aliases
	var you = 'You';
	var robot = 'Travel Bot';
	var name = '';
	var email = '';
	var phoneNumber = 0;
	var count = 0;
	var gloCount = 0;
	// slow reply by 400 to 800 ms
	var delayStart = 400;
	var delayEnd = 800;

	// initialize
	var bot = new chatBot();
	var chat = $('.chat');
	var waiting = 0;
	$('.busy').text(robot + ' is typing...');

	// submit user input and get chat-bot's reply
	var submitChat = function() {

		var input = $('.input input').val();
		if(input == '') return;

		$('.input input').val('');
		updateChat(you, input);
		if(count == 0)
			name = input;
		if(count == 1)
			email = input;
		if(count == 2)
			phoneNumber = input;
		count++;
		if(count == 3)
			var reply = bot.respondTo(input, gloCount);
		gloCount++;
			var but = $('<button style="background: url(https://www.prlog.org/12190100-ugapartybus-by-wgirls-atlanta-georgia-carolina-game-2013-wwwugapartybusorg.jpg)" />');
		if(reply == null) return;

		var latency = Math.floor((Math.random() * (delayEnd - delayStart)) + delayStart);
		$('.busy').css('display', 'block');
		waiting++;
		setTimeout( function() {
			if(typeof reply === 'string') {
				updateChat(robot, reply);
			} else {
				for(var r in reply) {
					updateChat(robot, reply[r]);
				}
			}
			if(--waiting == 0) $('.busy').css('display', 'none');
		}, latency);
	}

	// add a new line to the chat
	var updateChat = function(party, text) {

		var style = 'you';
		if(party != you) {
			style = 'other';
		}

		var line = $('<div><span class="party"></span> <span class="text"></span></div>');
		line.find('.party').addClass(style).text(party + ':');
		line.find('.text').text(text);

		chat.append(line);

		chat.stop().animate({ scrollTop: chat.prop("scrollHeight")});

	}

	// event binding
	$('.input').bind('keydown', function(e) {
		if(e.keyCode == 13) {
			submitChat();
		}
	});
	$('.input a').bind('click', submitChat);

	// initial chat state
	updateChat(robot, 'Hello, My name is '+robot+'\nI am your virtual travel agent, to take care of your tickets, flights, hotels, and other requests.\nTo start..What is your name, email, phone number');

});
