const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const data = require('./data');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../browser/build')));

// Answer API requests.
app.get('/api', (req, res) => {
	res.set('Content-Type', 'application/json');
	res.send(data);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
	response.sendFile(path.resolve(__dirname, '../browser/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`); //eslint-disable-line
});
