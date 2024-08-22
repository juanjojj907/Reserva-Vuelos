import React, { useEffect, useState } from 'react';
import { getEstadisticasAerolineas, getTotalAerolineas } from '../services/api';

const Estadisticas = () => {
    const [aerolineas, setAerolineas] = useState([]);
    const [totalAerolineas, setTotalAerolineas] = useState(0);

    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const aerolineasData = await getEstadisticasAerolineas();
                setAerolineas(aerolineasData.data);

                const totalAerolineasData = await getTotalAerolineas();
                setTotalAerolineas(totalAerolineasData.data[0].totalAerolineas);
            } catch (error) {
                console.error('Error al obtener las estadísticas:', error);
            }
        };

        fetchEstadisticas();
    }, []);

    return (
        <div>
            <h2>Estadísticas de Aerolíneas</h2>
            <p>Total de Aerolíneas Registradas: {totalAerolineas}</p>
            <h3>Aerolíneas con más reservas</h3>
            <ul>
                {aerolineas.map((aerolinea, index) => (
                    <li key={index}>{aerolinea.aerolinea}: {aerolinea.totalReservas} reservas</li>
                ))}
            </ul>
        </div>
    );
};

export default Estadisticas;
