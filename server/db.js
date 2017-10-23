const {
	createClient,
} = require('redis');

const url = process.env.REDIS_URL || 'redis://h:p286438176ddac76e14b7f08af84603926afa7e0197b0d5e0f1700bb096a1c922@ec2-34-252-202-201.eu-west-1.compute.amazonaws.com:11419';

const client = createClient({
	url,
});

class DB {

	write(key, value) {
		return new Promise(resolve => {
			client.set(key, JSON.stringify(value), () => resolve());
		});
	}

	read(key) {
		return new Promise(resolve => {
			client.get(key, (err, value) => {
				return resolve(JSON.parse(value));
			});
		});
	}

	delete(key) {
		return new Promise(resolve => {
			client.del(key, (err, value) => {
				return resolve(value);
			});
		});
	}

	keys() {
		return new Promise(resolve => {
			client.keys('*', (err, value) => resolve(value));
		});
	}

	dump() {
		return this.keys().then(keys => Promise.all((keys).map(this.read)));
	}

	quit() {
		return client.quit();
	}
}

const instance = new DB();

module.exports = instance;
