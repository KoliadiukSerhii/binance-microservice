import React, { useState, useEffect, useRef } from 'react';

const ExchangeRatesPage: React.FC = () => {
	const [currency, setCurrency] = useState<string>('etheur');
	const [price, setPrice] = useState<number>(0);
	const [increased, setIncreased] = useState<boolean>(false);
	const [connected, setConnected] = useState<boolean>(false);

	const socket = useRef<WebSocket | null>(null);

	useEffect(() => {
		socket.current = new WebSocket('ws://localhost:7000');

		socket.current.onopen = () => {
			setConnected(true);
			if (socket.current?.readyState === WebSocket.OPEN) {
				socket.current.send(JSON.stringify({ symbol: currency }));
			}
			console.log('socket connected');
		};

		socket.current.onmessage = (event) => {
			const { currentPrice, isIncreased } = JSON.parse(event.data);
			setPrice(currentPrice);
			setIncreased(isIncreased);
		};
	}, []);

	useEffect(() => {
		setPrice(0);
		if (socket.current?.readyState === WebSocket.OPEN) {
			socket.current.send(JSON.stringify({ symbol: currency }));
		}
	}, [currency]);

	return (
		<div className="card">
			<h1>Current courses</h1>
			<p>
				Cryptocurrency:
				<select
					value={currency}
					onChange={(event) => {
						setCurrency(event.target.value);
					}}
				>
					<option value="etheur">etheur</option>
					<option value="bnbeur">bnbeur</option>
					<option value="btceur">btceur</option>
				</select>
			</p>
			<p>
				Current price: <p className={increased ? 'green' : 'red'}>{connected && price !== 0 ? '€' + price : '...'}</p>
			</p>
		</div>
	);
};

export default ExchangeRatesPage;
