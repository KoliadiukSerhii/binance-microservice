import WebSocket from 'ws';
const CurrencyPostgreController = require('../controllers/currencyPostgreController');
const CurrencyRedisController = require('../controllers/currencyRedisController');

interface IBroadcastMessage {
	currentPrice: number | null;
	isIncreased: boolean;
}

function connectWSS(wss: WebSocket.Server): void {
	wss.on('connection', function connection(socket: WebSocket) {
		const wsConnectionsToBinance: WebSocket[] = [];
		const intervals: NodeJS.Timeout[] = [];
		socket.on('message', async function (message: WebSocket.RawData) {
			closeAllConnections(wsConnectionsToBinance, intervals);
			let lastPrice: number | null = null;
			let isIncreased: boolean = false;
			const msg = JSON.parse(message.toString('utf-8'));
			const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${msg.symbol}
			@trade`);

			const lastRecord = await getLastRecord(msg.symbol);
			lastPrice = lastRecord.price;
			isIncreased = lastRecord.isIncreased;
			if (lastPrice) {
				broadcastMessage(wss, {
					currentPrice: lastPrice,
					isIncreased: isIncreased,
				});
			}

			const intervalsID: NodeJS.Timeout[] = await createIntervalRecords(msg.symbol, lastPrice, isIncreased);
			wsConnectionsToBinance.push(ws);
			intervals.push(...intervalsID);

			ws.on('message', (data) => {
				const parsedData = JSON.parse(data.toString('utf-8'));
				const currentPrice = Number(parseFloat(parsedData.p).toFixed(2));
				if (lastPrice && currentPrice >= lastPrice) {
					isIncreased = true;
				} else if (lastPrice && currentPrice < lastPrice) {
					isIncreased = false;
				}

				lastPrice = currentPrice;
				broadcastMessage(wss, {
					currentPrice: lastPrice,
					isIncreased: isIncreased,
				});
			});
		});
	});
}

async function getLastRecord(name: string) {
	const lastRedisRecord = await CurrencyRedisController.getOne(name);

	if (lastRedisRecord) {
		return {
			price: lastRedisRecord.price,
			isIncreased: lastRedisRecord.isIncreased,
		};
	}

	const lastPostgreRecord = await CurrencyPostgreController.getLastRecord(name);
	return {
		price: lastPostgreRecord.dataValues.price,
		isIncreased: lastPostgreRecord.dataValues.isIncreased,
	};
}

function createIntervalRecords(name: string, price: number | null, isIncreased: boolean) {
	const redisInterval = 60 * 1000;
	const postgreInterval = 60 * 60 * 1000;

	const redisIntervalID = setInterval(() => {
		CurrencyRedisController.create(name, price, isIncreased);
	}, redisInterval);

	const postgreIntervalID = setInterval(() => {
		CurrencyPostgreController.create(name, price, isIncreased);
	}, postgreInterval);

	return [redisIntervalID, postgreIntervalID];
}

function broadcastMessage(wss: WebSocket.Server, message: IBroadcastMessage) {
	wss.clients.forEach((client) => {
		client.send(JSON.stringify(message));
	});
}

function closeAllConnections(wsConnections: WebSocket[], intervals: NodeJS.Timeout[]) {
	wsConnections.forEach((ws) => {
		if (ws && ws.readyState === WebSocket.OPEN) {
			ws.close();
		}
	});

	intervals.forEach((intervalId) => {
		clearInterval(intervalId);
	});
}

module.exports = connectWSS;
