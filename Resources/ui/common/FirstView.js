//FirstView Component Constructor
function FirstView() {
	
	var io = require('socket.io-titanium');
	var socket = io.connect('192.168.0.247:1337');
	
	socket.on('connect', function () {
		socket.emit('adduser', 'iOS');
	});
	
	socket.on('updateusers', function (usernames) {
		labelUsers.update(usernames);
	});
	
	socket.on('updatechat', function (username, data) {
		chatArea.update(username, data);
	});
	
	var self = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	var label = Ti.UI.createLabel({
		color:'#dedede',
		color:'#999',
		font: {fontSize:'25sp', fontWeight:'bold'},
		text: 'Node & Socket.io Chat Test',
		top: 10,
		height:'auto',
		width:'auto'
	});
	self.add(label);
	
	var mainBox = Ti.UI.createView({
		top: 50,
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		bottom: 60,
		backgroundColor: 'dedede',
		layout: 'horizontal'
	});
	self.add(mainBox);
	
	var userView = Ti.UI.createView({
		width: '20%',
		height: Ti.UI.FILL,
		backgroundColor: '#8fff',
		layout: 'vertical'
	});
	mainBox.add(userView);
	
	var headlineUsers = Ti.UI.createLabel({
		color:'#dedede',
		text: 'USERS',
		top: 2,
		height:'auto',
		width:'auto'
	});
	userView.add(headlineUsers);
	
	var labelUsers = Ti.UI.createLabel({
		color:'#000',
		text: '',
		top: 2,
		height:'auto',
		width:'auto'
	});
	labelUsers.update = function (users) {
		labelUsers.text = ''
		for (i in users) {
			labelUsers.text += users[i] + '\n';
		}
	};
	userView.add(labelUsers);
	
	var chatView = Ti.UI.createView({
		width: '80%',
		height: Ti.UI.FILL,
		backgroundColor: '#8000',
		layout: 'vertical'
	});
	mainBox.add(chatView);
	var labelChat = Ti.UI.createLabel({
		color:'#fff',
		text: 'CHAT',
		top: 2,
		height:'auto',
		width:'auto'
	});
	chatView.add(labelChat);
	scrollChat = Ti.UI.createScrollView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: '#fff',
		top: 20,
		bottom: 0,
		showVerticalScrollIndicator: true,
	});
	chatView.add(scrollChat);
	var chatArea = Ti.UI.createLabel({
		bottom: 0,
		text: '',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE
	});
	chatArea.update = function (username, data) {
		chatArea.text = chatArea.text + '\n' + (username + ': ' + data);
	}
	scrollChat.add(chatArea);
	
	var bottomBox = Ti.UI.createView({
		bottom: 0,
		height: 60,
		width: Ti.UI.FILL,
		backgroundColor: 'dedede'
	});
	self.add(bottomBox);
	var postField = Ti.UI.createTextField({
		right: 100,
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		hintText: 'Chat text...'
	});
	bottomBox.add(postField);
	var postButton = Ti.UI.createButton({
		height: Ti.UI.FILL,
		width: 100,
		right: 0,
		title: 'post'
	});
	postButton.addEventListener('click', function () {
		socket.emit('sendchat', postField.value);
		postField.value = '';
		postField.blur();
	});
	bottomBox.add(postButton);
	
	return self;
}

module.exports = FirstView;
