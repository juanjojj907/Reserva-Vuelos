import React, { useState } from 'react';
import { createReserva } from '../services/api';

const ReservarVuelo = ({ vuelo }) => {
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');

    const handleReservar = async (e) => {
        e.preventDefault();
        try {
            const reservaData = {
                vueloId: vuelo.id,
                nombreCliente,
                emailCliente,
            };

            const nuevaReserva = await createReserva(reservaData);
            alert('Reserva realizada con éxito');
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Error al realizar la reserva');
        }
    };

    return (
        <form onSubmit={handleReservar}>
            <h3>Reservar Vuelo: {vuelo.origen} a {vuelo.destino}</h3>
            <input
                type="text"
                placeholder="Nombre del Cliente"
                value={nombreCliente}
                onChange={(e) => setNombreCliente(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email del Cliente"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                required
            />
            <button type="submit">Reservar</button>
        </form>
    );
};

export default ReservarVuelo;
