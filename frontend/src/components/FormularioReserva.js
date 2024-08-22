import React, { useState } from 'react';
import { createReserva } from '../services/api'; // Importa la función API para crear una reserva

const FormularioReserva = ({ vuelo }) => {
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [mensaje, setMensaje] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const nuevaReserva = {
                vueloId: vuelo.id,
                nombreCliente,
                emailCliente,
            };

            const response = await createReserva(nuevaReserva);
            setMensaje('Reserva creada exitosamente!');
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            setMensaje('Error al crear la reserva.');
        }
    };

    return (
        <div>
            <h3>Reservar Vuelo de {vuelo.origen} a {vuelo.destino}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Cliente:</label>
                    <input
                        type="text"
                        value={nombreCliente}
                        onChange={(e) => setNombreCliente(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email del Cliente:</label>
                    <input
                        type="email"
                        value={emailCliente}
                        onChange={(e) => setEmailCliente(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reservar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default FormularioReserva;
