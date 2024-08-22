const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Vuelo = require('./Vuelo');  // Asegúrate de importar el modelo Vuelo si es necesario

const Reserva = sequelize.define('Reserva', {
    vueloId: {
        type: DataTypes.INTEGER,
        references: {
            model: Vuelo,
            key: 'id'
        },
        allowNull: false
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailCliente: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Reserva;
