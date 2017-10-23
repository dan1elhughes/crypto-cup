const db = require('./db');

db.keys().then(keys => {
	keys.forEach(db.delete);
});
