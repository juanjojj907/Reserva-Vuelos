const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const Vuelo = require('./models/Vuelo');
const Reserva = require('./models/Reserva');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:3000', // Permite solicitudes desde este origen (el frontend)
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});

setTimeout(() => {

// Sincronizar el modelo con la base de datos
sequelize.sync({ alter: true })  // Usa 'alter: true' para aplicar cambios en la base de datos sin eliminar datos existentes
    .then(() => {
        console.log('Tablas sincronizadas.');
    })
    .catch(err => {
        console.error('Error al sincronizar las tablas:', err);
    });

}, 10000); // Retraso de 10 segundos

// CRUD de Vuelo
app.post('/vuelos', async (req, res) => {
    try {
        const nuevoVuelo = await Vuelo.create(req.body);
        res.status(201).json(nuevoVuelo);
    } catch (error) {
        console.error('Error al crear el vuelo:', error);
        res.status(500).json({ message: 'Error al crear el vuelo' });
    }
});

app.get('/vuelos', async (req, res) => {
    try {
        const vuelos = await Vuelo.findAll();
        res.status(200).json(vuelos);
    } catch (error) {
        console.error('Error al obtener los vuelos:', error);
        res.status(500).json({ message: 'Error al obtener los vuelos' });
    }
});

app.get('/vuelos/:id', async (req, res) => {
    try {
        const vuelo = await Vuelo.findByPk(req.params.id);
        if (vuelo) {
            res.status(200).json(vuelo);
        } else {
            res.status(404).json({ message: 'Vuelo no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el vuelo:', error);
        res.status(500).json({ message: 'Error al obtener el vuelo' });
    }
});

app.put('/vuelos/:id', async (req, res) => {
    try {
        const vuelo = await Vuelo.findByPk(req.params.id);
        if (vuelo) {
            await vuelo.update(req.body);
            res.status(200).json(vuelo);
        } else {
            res.status(404).json({ message: 'Vuelo no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el vuelo:', error);
        res.status(500).json({ message: 'Error al actualizar el vuelo' });
    }
});

app.delete('/vuelos/:id', async (req, res) => {
    try {
        const vuelo = await Vuelo.findByPk(req.params.id);
        if (vuelo) {
            await vuelo.destroy();
            res.status(204).json({ message: 'Vuelo eliminado' });
        } else {
            res.status(404).json({ message: 'Vuelo no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el vuelo:', error);
        res.status(500).json({ message: 'Error al eliminar el vuelo' });
    }
});

// Endpoint para buscar vuelos según criterios de origen, destino y fechas
app.get('/vuelos/buscar', async (req, res) => {
    const { origen, destino, fechaSalida, fechaLlegada } = req.query;

    try {
        const query = `SELECT * FROM "Vuelos" WHERE "origen" = :origen AND "destino" = :destino AND "fechaSalida" = :fechaSalida AND "fechaLlegada" = :fechaLlegada`;
        const vuelos = await sequelize.query(query, {
            replacements: {
                origen,
                destino,
                fechaSalida,
                fechaLlegada
            },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json(vuelos);
    } catch (error) {
        console.error('Error al buscar vuelos:', error);
        res.status(500).json({ message: 'Error al buscar vuelos' });
    }
});

// Crear una nueva reserva para un vuelo seleccionado
app.post('/reservas', async (req, res) => {
    try {
        const { vueloId, nombreCliente, emailCliente } = req.body;

        // Verificar si el vuelo existe
        const vuelo = await Vuelo.findByPk(vueloId);
        if (!vuelo) {
            return res.status(404).json({ message: 'Vuelo no encontrado' });
        }

        // Crear la reserva
        const nuevaReserva = await Reserva.create({
            vueloId: vuelo.id,
            nombreCliente,
            emailCliente,
        });

        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
});

// CRUD de Reservas
app.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
});

app.get('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (reserva) {
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la reserva:', error);
        res.status(500).json({ message: 'Error al obtener la reserva' });
    }
});

app.put('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (reserva) {
            await reserva.update(req.body);
            res.status(200).json(reserva);
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
});

app.delete('/reservas/:id', async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id);
        if (reserva) {
            await reserva.destroy();
            res.status(204).json({ message: 'Reserva eliminada' });
        } else {
            res.status(404).json({ message: 'Reserva no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        res.status(500).json({ message: 'Error al eliminar la reserva' });
    }
});

// Estadísticas aerolíneas
app.get('/estadisticas/aerolineas', async (req, res) => {
    try {
        const resultado = await sequelize.query(
            `SELECT "aerolinea", COUNT(*) as "totalReservas" 
             FROM "Vuelos" INNER JOIN "Reservas" ON "Vuelos"."id" = "Reservas"."vueloId" 
             GROUP BY "aerolinea" 
             ORDER BY "totalReservas" DESC;`
        );
        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error('Error al obtener estadísticas de aerolíneas:', error);
        res.status(500).json({ message: 'Error al obtener estadísticas de aerolíneas' });
    }
});

app.get('/estadisticas/total-aerolineas', async (req, res) => {
    try {
        const resultado = await sequelize.query(
            `SELECT COUNT(DISTINCT "aerolinea") as "totalAerolineas" 
             FROM "Vuelos";`
        );
        res.status(200).json(resultado[0]);
    } catch (error) {
        console.error('Error al obtener el número total de aerolíneas:', error);
        res.status(500).json({ message: 'Error al obtener el número total de aerolíneas' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
