const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Vuelo = sequelize.define('Vuelo', {
    origen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaSalida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fechaLlegada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    aerolinea: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Vuelo;
