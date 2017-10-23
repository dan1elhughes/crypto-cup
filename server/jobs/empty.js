const db = require('../db');

db.keys()
	.then(keys => Promise.all(keys.map(db.delete)))
	.then(db.quit);
