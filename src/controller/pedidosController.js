const { request, response } = require('express');
const bodyParser = require('body-parser');
const Pedido = require('../model/pedidos')
const app = express();


app.use(bodyParser.json());


// Guardar Pedido
const guardarPedido = async (usuario, fecha, menu, estado) => {
    try {
        const nuevoPedido = new Pedido({
            usuario,
            fecha,
            menu,
            estado,
        });

        await nuevoPedido.save();
        return 'Pedido guardado';
    } catch (error) {
        console.error('Error al guardar el pedido:', error);
        throw new Error('Hubo un error al guardar el pedido');
    }
};


//Mostrar pedido

const mostrarPedidos = async () => {
    try {
        const pedidos = await Pedido.find();
        return pedidos;
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        throw new Error('Hubo un error al obtener los pedidos');
    }
};

//Modificar estado Pedido

const modificarEstadoPedido = async (pedidoId, nuevoEstado) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(
            pedidoId,
            { estado: nuevoEstado },
            { new: true }
        );

        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }

        return pedido;
    } catch (error) {
        console.error('Error al modificar el estado del pedido:', error);
        throw new Error('Hubo un error al modificar el estado del pedido');
    }
};

// Eliminiar pedido
const eliminarPedido = async (pedidoId) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(pedidoId);

        if (!pedido) {
            throw new Error('Pedido no encontrado');
        }

        return 'Pedido eliminado';
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        throw new Error('Hubo un error al eliminar el pedido');
    }
};


module.exports = {
    guardarPedido,
    modificarEstadoPedido,
    mostrarPedidos,
    eliminarPedido
}