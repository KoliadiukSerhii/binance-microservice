require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const sequelize = require('./database/createPostgreDB');
const connectWSS = require('./websockets/connectWSS');

const app = express();
const PORT = process.env.PORT || 5000;

const wss = new WebSocket.Server(
	{
		port: process.env.WS_PORT,
	},
	() => console.log(`ws server started on PORT ${process.env.WS_PORT}`)
);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
		connectWSS(wss);
	} catch (error) {
		console.log(error);
	}
};

start();
