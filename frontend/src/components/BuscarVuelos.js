import React, { useState } from 'react';
import { buscarVuelos } from '../services/api'; // Importa la función API para buscar vuelos

const BuscarVuelos = ({ onResultadosEncontrados }) => {
    const [criteriosBusqueda, setCriteriosBusqueda] = useState({
        origen: '',
        destino: '',
        fechaSalida: '',
        fechaLlegada: ''
    });

    const handleChange = (e) => {
        setCriteriosBusqueda({
            ...criteriosBusqueda,
            [e.target.name]: e.target.value
        });
    };

    const handleBuscar = async (e) => {
        e.preventDefault();

        if (!criteriosBusqueda.origen || !criteriosBusqueda.destino) {
            alert("Por favor, complete al menos los campos de Origen y Destino.");
            return;
        }

        try {
            const resultados = await buscarVuelos(criteriosBusqueda);
            onResultadosEncontrados(resultados); // Llama la función para mostrar los resultados
        } catch (error) {
            console.error('Error al buscar vuelos:', error);
        }
    };

    return (
        <form onSubmit={handleBuscar}>
            <input name="origen" value={criteriosBusqueda.origen} onChange={handleChange} placeholder="Origen" />
            <input name="destino" value={criteriosBusqueda.destino} onChange={handleChange} placeholder="Destino" />
            <input name="fechaSalida" type="date" value={criteriosBusqueda.fechaSalida} onChange={handleChange} placeholder="Fecha de Salida" />
            <input name="fechaLlegada" type="date" value={criteriosBusqueda.fechaLlegada} onChange={handleChange} placeholder="Fecha de Llegada" />
            <button type="submit">Buscar Vuelos</button>
        </form>
    );
};

export default BuscarVuelos;
