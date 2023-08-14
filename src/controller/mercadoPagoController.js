const { request, response } = require('express');
const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

mercadopago.configure({
	access_token: "<TEST-11152056146747-081405-01e738de716b2fd444a80f1353904f9b-785022875>",
});

async function dataInicial (req = request, res = response) {
	res.send('server is working')
}

async function pagarPedido (req = request, res = response) {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173/",
			"failure": "http://localhost:5173/",
			"pending": "http://localhost:5173/"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
}



module.exports = {dataInicial,pagarPedido};
