const db = require('../db');

db.dump().then(values => {
	console.log(values);
	db.quit();
});
