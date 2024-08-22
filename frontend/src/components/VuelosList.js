import React, { useEffect, useState } from 'react';
import { getVuelos } from '../services/api'; // Importa la función API

const VuelosList = ({ onSeleccionarVuelo }) => {
    const [vuelos, setVuelos] = useState([]); // Estado para almacenar los vuelos

    // Función para obtener los vuelos desde la API
    useEffect(() => {
        const fetchVuelos = async () => {
            try {
                const response = await getVuelos(); // Llama a la función getVuelos
                setVuelos(response.data); // Actualiza el estado con los datos obtenidos
            } catch (error) {
                console.error('Error al obtener los vuelos:', error);
            }
        };

        fetchVuelos(); // Ejecuta la función al montar el componente
    }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montar

    return (
        <div>
            <h2>Lista de Vuelos</h2>
            <ul>
                {vuelos.map((vuelo) => (
                    <li key={vuelo.id}>
                        {vuelo.origen} a {vuelo.destino} - {vuelo.aerolinea} (${vuelo.precio})
                        <button onClick={() => onSeleccionarVuelo(vuelo)}>Reservar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VuelosList;

