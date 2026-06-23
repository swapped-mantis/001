const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use('/', express.static('../client'));
// app.use('/me', express.static(__dirname));

io.on('connection', (socket) => {
	socket.on('set-username', (username) => {
		if(username) console.log(`User "${username}" connected.`);
		else console.log("A user connected");

		socket.username = username;
	});

	socket.on('chat-message', (message) => {
		io.emit('chat-message', { username: socket.username, text: message });
	});
});

server.listen(1111, () => console.log('Server running at http://localhost:1111')); 