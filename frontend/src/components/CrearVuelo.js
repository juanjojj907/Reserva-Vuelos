import React, { useState } from 'react';
import { createVuelo } from '../services/api'; // Importa la función API

const CrearVuelo = ({ onVueloCreado }) => {
    const [vueloData, setVueloData] = useState({
        origen: '',
        destino: '',
        fechaSalida: '',
        fechaLlegada: '',
        aerolinea: '',
        precio: ''
    });

    // Manejar los cambios en los inputs del formulario
    const handleChange = (e) => {
        setVueloData({
            ...vueloData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica que las fechas sean válidas
        const fechaSalida = new Date(vueloData.fechaSalida);
        const fechaLlegada = new Date(vueloData.fechaLlegada);

        if (isNaN(fechaSalida.getTime()) || isNaN(fechaLlegada.getTime())) {
            alert('Por favor, ingresa fechas válidas.');
            return;
        }

        try {
            // Convierte las fechas a un formato adecuado antes de enviar
            const vueloDataFormatted = {
                ...vueloData,
                fechaSalida: fechaSalida.toISOString(),
                fechaLlegada: fechaLlegada.toISOString()
            };
            await createVuelo(vueloDataFormatted); // Llama a la función createVuelo con las fechas formateadas
            alert('Vuelo creado con éxito');

            // Limpiar el formulario después de enviar
            setVueloData({
                origen: '',
                destino: '',
                fechaSalida: '',
                fechaLlegada: '',
                aerolinea: '',
                precio: ''
            });

            if (onVueloCreado) {
                onVueloCreado(); // Llama a la función para actualizar la lista de vuelos si se pasa como prop
            }
        } catch (error) {
            console.error('Error al crear el vuelo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="origen" value={vueloData.origen} onChange={handleChange} placeholder="Origen" />
            <input name="destino" value={vueloData.destino} onChange={handleChange} placeholder="Destino" />
            <input name="fechaSalida" type="date" value={vueloData.fechaSalida} onChange={handleChange} placeholder="Fecha de Salida" />
            <input name="fechaLlegada" type="date" value={vueloData.fechaLlegada} onChange={handleChange} placeholder="Fecha de Llegada" />
            <input name="aerolinea" value={vueloData.aerolinea} onChange={handleChange} placeholder="Aerolínea" />
            <input name="precio" value={vueloData.precio} onChange={handleChange} placeholder="Precio" />
            <button type="submit">Crear Vuelo</button>
        </form>
    );
};

export default CrearVuelo;

