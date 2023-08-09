const { request, response } = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Pedido = require('../model/pedidos')
const app = express();


app.use(bodyParser.json());

// Conexión a MongoDB

    // mongoose.connect('mongodb+srv://emilianoac14:1d2ZDKAHKU5zZImb@cluster0.v3ndomb.mongodb.net/pedidos', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });

// Ruta para guardar un pedido

app.post('/api/pedidos', async (req, res) => {
    try {
        const { usuario, fecha, menu, estado } = req.body;

        const nuevoPedido = new Pedido({
            usuario,
            fecha,
            menu,
            estado,
        });

        await nuevoPedido.save();

        res.status(201).json({ message: 'Pedido guardado' });
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        res.status(500).json({ error: 'Hubo un error al guardar el pedido' });
    }
});

// const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Servidor en funcionamiento en el puerto 3000`);
});


//mostrar pedido

app.get('/api/pedidos/:pedidoId', async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;

        const pedido = await Pedido.findById(pedidoId);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error('Error al obtener el pedido:', error);
        res.status(500).json({ error: 'Hubo un error al obtener el pedido' });
    }
});

// const PORT2 = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Servidor en funcionamiento en el puerto 3000`);
});

//estado pedido

app.patch('/api/pedidos/:pedidoId', async (req, res) => {
    try {
        const pedidoId = req.params.pedidoId;
        const { estado } = req.body;

        const pedido = await Pedido.findByIdAndUpdate(
            pedidoId,
            { estado },
            { new: true }
        );

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error('Error al modificar el estado del pedido:', error);
        res.status(500).json({ error: 'Hubo un error al modificar el estado del pedido' });
    }
});

// const PORT3 = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Servidor en funcionamiento en el puerto 3000`);
});