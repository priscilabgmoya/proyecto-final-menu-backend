const { request, response } = require('express');
const mercadopago = require("mercadopago");

mercadopago.configure({
	access_token: "TEST-2171307434564524-082123-de787478a36dd17318f6ff7ea2937ec8-152864091",
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
			"success": "https://friky-sangucheria-v2.netlify.app/",
			"failure": "https://friky-sangucheria-v2.netlify.app/",
			"pending": "",
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
