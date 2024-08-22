import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
    baseURL: 'http://localhost:3001', // Cambia esto si tu backend está en otro puerto o dominio
});

// Obtener todos los vuelos
export const getVuelos = async () => {
    return await api.get('/vuelos');
};

// Crear un nuevo vuelo
export const createVuelo = async (vueloData) => {
    return await api.post('/vuelos', vueloData);
};

// Obtener un vuelo por ID
export const getVueloById = async (id) => {
    return await api.get(`/vuelos/${id}`);
};

// Actualizar un vuelo
export const updateVuelo = async (id, vueloData) => {
    return await api.put(`/vuelos/${id}`, vueloData);
};

// Eliminar un vuelo
export const deleteVuelo = async (id) => {
    return await api.delete(`/vuelos/${id}`);
};

// Obtener estadísticas de aerolíneas
export const getEstadisticasAerolineas = async () => {
    return await api.get('/estadisticas/aerolineas');
};

// Obtener número total de aerolíneas
export const getTotalAerolineas = async () => {
    return await api.get('/estadisticas/total-aerolineas');
};

// Buscar vuelos por criterios de búsqueda
export const buscarVuelos = async (criteriosBusqueda) => {
    console.log("Criterios de búsqueda enviados:", criteriosBusqueda);
    return await api.get('/vuelos/buscar', {
        params: criteriosBusqueda,
    });
};

// Crear una nueva reserva para un vuelo
export const createReserva = async (reservaData) => {
    return await api.post('/reservas', reservaData);
};
