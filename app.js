const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('index');
})

app.post('/', (req, res) => {

	// let crypto = req.body.crypto;
	// let fiat = req.body.fiat;
	// let cryptoPriceURL = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/' + crypto + fiat;
	// console.log(crypto);

	let options = {
		url: "https://apiv2.bitcoinaverage.com/convert/global",
		method: "GET",
		qs: {
			from: req.body.from,
			to: req.body.to,
			amount: req.body.amount,
		}
	}

	console.log(options);

	// request(cryptoPriceURL, (error, response, body) => {
	// 	const data = JSON.parse(body);
	// 	const price = data.last;
	// 	console.log(crypto + fiat + " : " + price);
	// })

	request(options, (error, response, body) => {
		const data = JSON.parse(body);
		const price = data.price;
		// res.writeHead("<h1> Bitcoin converter </h1><br>");
		res.write("<h2> Time : " + data.time + "</h2><br>");
		res.write("<h2> The Price is : " + price + " </h2>");
		res.send();
	})
})

app.listen(port, () => {
	console.log('Server is running on port', port);
})

