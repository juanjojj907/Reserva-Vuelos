import React, { useState, useEffect } from 'react';
import './App.css';
import VuelosList from './components/VuelosList';
import CrearVuelo from './components/CrearVuelo';
import BuscarVuelos from './components/BuscarVuelos';
import FormularioReserva from './components/FormularioReserva'; // Importa el formulario de reserva
import Estadisticas from './components/Estadisticas'; // Importa el componente de estadísticas
import { getVuelos } from './services/api';

function App() {
  const [vuelos, setVuelos] = useState([]);
  const [vueloSeleccionado, setVueloSeleccionado] = useState(null); // Estado para el vuelo seleccionado

  // Función para cargar la lista de vuelos desde el backend
  const cargarVuelos = async () => {
    try {
      const vuelosData = await getVuelos();
      setVuelos(vuelosData.data); // Acceder correctamente a los datos devueltos por Axios
    } catch (error) {
      console.error('Error al cargar los vuelos:', error);
    }
  };

  // Función para manejar los resultados de la búsqueda
  const manejarBusqueda = (resultados) => {
    setVuelos(resultados.data); // Actualizar la lista de vuelos con los resultados de la búsqueda
  };

  // Función para manejar la selección de un vuelo
  const manejarSeleccionVuelo = (vuelo) => {
    setVueloSeleccionado(vuelo); // Guardar el vuelo seleccionado en el estado
  };

  // Cargar la lista de vuelos cuando el componente se monta
  useEffect(() => {
    cargarVuelos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Reservas de Vuelos</h1>
      </header>
      <main>
        <CrearVuelo onVueloCreado={cargarVuelos} />
        <BuscarVuelos onResultadosEncontrados={manejarBusqueda} />
        <VuelosList vuelos={vuelos} onSeleccionarVuelo={manejarSeleccionVuelo} />
        {vueloSeleccionado && <FormularioReserva vuelo={vueloSeleccionado} />} 
        <Estadisticas /> {/* Agregar el componente de estadísticas */}
      </main>
    </div>
  );
}

export default App;
