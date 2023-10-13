import redisClient from '../database/createRedisDB';
import Redlock, { Lock } from 'redlock';

class CurrencyRedisController {
	private redlock: Redlock;

	constructor() {
		this.redlock = new Redlock([redisClient]);
	}

	async create(name: string, price: number, isIncreased: boolean) {
		try {
			const lock: Lock = await this.redlock.acquire([name], 10000);
			const expirationTimeInSeconds = 30 * 60;
			const data = {
				name: name,
				price: price,
				isIncreased: isIncreased,
			};

			const result = await redisClient.set(name, JSON.stringify(data), 'EX', expirationTimeInSeconds);

			await this.redlock.release(lock);

			return result;
		} catch (error) {
			console.log(error);
		}
	}

	async getOne(name: string) {
		try {
			const data = await redisClient.get(name);

			return JSON.parse(data);
		} catch (error) {
			console.log(error);
		}
	}

	async deleteOne(name: string) {
		try {
			const result = await redisClient.del(name);

			return result;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new CurrencyRedisController();
