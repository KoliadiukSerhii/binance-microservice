const { CryptoCurrency } = require('../models/postgreModel');

class CurrencyPostgreController {
	async create(name: string, price: number, isIncreased: boolean) {
		try {
			const cryptocurrency = await CryptoCurrency.create({ name, price, isIncreased });

			return cryptocurrency;
		} catch (error) {
			console.log(error);
		}
	}

	async getLastRecord(symbol: string) {
		try {
			const lastRecord = await CryptoCurrency.findOne({
				where: {
					name: symbol,
				},
				order: [['createdAt', 'DESC']],
			});

			return lastRecord;
		} catch (error) {
			console.log(error);
		}
	}

	async deleteOne(id: number) {
		try {
			return await CryptoCurrency.destroy({
				where: {
					id: id,
				},
			});
		} catch (error: any) {
			console.log(error);
		}
	}

	async deleteAll() {
		try {
			return await CryptoCurrency.destroy({
				where: {},
				truncate: true,
			});
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new CurrencyPostgreController();
