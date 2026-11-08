import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { productosIniciales } from './data/productosIniciales';
import NavbarBotica from './components/NavbarBotica';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';

function App() {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('nova_salud_usuario');
    return guardado ? JSON.parse(guardado) : null;
  });

  const [productos, setProductos] = useState(() => {
    const guardado = localStorage.getItem('nova_salud_productos');
    return guardado ? JSON.parse(guardado) : productosIniciales;
  });

  const [ventas, setVentas] = useState(() => {
    const guardado = localStorage.getItem('nova_salud_ventas');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('nova_salud_productos', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('nova_salud_ventas', JSON.stringify(ventas));
  }, [ventas]);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('nova_salud_usuario', JSON.stringify(datosUsuario));
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('nova_salud_usuario');
  };

  const agregarProducto = (nuevoProd) => {
    setProductos([...productos, { ...nuevoProd, id: Date.now() }]);
  };

  const reabastecerRapido = (id, cantidad) => {
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, stock: p.stock + cantidad } : p))
    );
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const registrarVenta = ({ cliente, items, total }) => {
    // 1. Descontar stock en tiempo real
    const productosActualizados = productos.map((prod) => {
      const itemVendido = items.find((i) => i.id === prod.id);
      if (itemVendido) {
        return { ...prod, stock: prod.stock - itemVendido.cantidad };
      }
      return prod;
    });
    setProductos(productosActualizados);

    // 2. Guardar registro de la venta
    const nuevaVenta = {
      id: ventas.length + 1001,
      fecha: new Date().toLocaleString(),
      cliente,
      items,
      total
    };
    setVentas([nuevaVenta, ...ventas]);
  };

  const cantidadAlertas = productos.filter((p) => p.stock <= p.stockMinimo).length;

  return (
    <BrowserRouter>
      <NavbarBotica
        usuario={usuario}
        cerrarSesion={cerrarSesion}
        cantidadAlertas={cantidadAlertas}
      />
      <Routes>
        <Route
          path="/login"
          element={usuario ? <Navigate to="/" /> : <Login iniciarSesion={iniciarSesion} />}
        />
        <Route
          path="/"
          element={
            usuario ? (
              <Dashboard
                productos={productos}
                ventas={ventas}
                reabastecerRapido={reabastecerRapido}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/inventario"
          element={
            usuario ? (
              <Inventario
                productos={productos}
                agregarProducto={agregarProducto}
                reabastecerRapido={reabastecerRapido}
                eliminarProducto={eliminarProducto}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/ventas"
          element={
            usuario ? (
              <Ventas
                productos={productos}
                registrarVenta={registrarVenta}
                ventas={ventas}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;