import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert } from 'react-bootstrap';

function Ventas({ productos, registrarVenta, ventas }) {
  const [busqueda, setBusqueda] = useState('');
  const [cliente, setCliente] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');

  const productosDisponibles = productos.filter(
    (p) =>
      p.stock > 0 &&
      (p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.codigo.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      if (existe.cantidad + 1 > producto.stock) {
        alert('No hay suficiente stock disponible para agregar más unidades.');
        return;
      }
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const totalVenta = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const confirmarVenta = (e) => {
    e.preventDefault();
    if (carrito.length === 0) return;

    registrarVenta({
      cliente: cliente.trim() || 'Cliente General',
      items: carrito,
      total: totalVenta
    });

    setCarrito([]);
    setCliente('');
    setMensajeExito('✅ Venta registrada con éxito y stock actualizado en tiempo real.');
    setTimeout(() => setMensajeExito(''), 4000);
  };

  return (
    <Container>
      <h2 className="mb-4 fw-bold">🛒 Atención Rápida al Cliente y Registro de Ventas</h2>

      {mensajeExito && <Alert variant="success">{mensajeExito}</Alert>}

      <Row className="mb-4">
        {/* Buscador rápido de medicamentos para atención ágil */}
        <Col lg={7} className="mb-3">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-dark text-white fw-bold">
              1. Búsqueda Rápida de Medicamentos
            </Card.Header>
            <Card.Body>
              <Form.Control
                type="text"
                placeholder="🔍 Escribe el nombre o código del medicamento para atender rápido..."
                className="mb-3"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                <Table hover size="sm" className="align-middle">
                  <thead>
                    <tr>
                      <th>Medicamento</th>
                      <th>Precio</th>
                      <th>Disponible</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosDisponibles.map((prod) => (
                      <tr key={prod.id}>
                        <td>
                          <strong>{prod.nombre}</strong>
                          <br />
                          <small className="text-muted">{prod.codigo}</small>
                        </td>
                        <td>S/ {prod.precio.toFixed(2)}</td>
                        <td>
                          <Badge bg={prod.stock <= prod.stockMinimo ? 'warning' : 'secondary'}>
                            {prod.stock} unid.
                          </Badge>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => agregarAlCarrito(prod)}
                          >
                            + Agregar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Boleta / Carrito de Venta */}
        <Col lg={5}>
          <Card className="shadow-sm border-success h-100">
            <Card.Header className="bg-success text-white fw-bold">
              2. Comprobante de Venta Actual
            </Card.Header>
            <Card.Body>
              <Form onSubmit={confirmarVenta}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Cliente o DNI (Opcional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Juan Pérez / DNI 45678912"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                  />
                </Form.Group>

                <Table size="sm" bordered className="mb-3">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                          Selecciona medicamentos de la lista izquierda
                        </td>
                      </tr>
                    ) : (
                      carrito.map((item) => (
                        <tr key={item.id}>
                          <td>{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                          <td>
                            <Button
                              variant="link"
                              className="text-danger p-0"
                              onClick={() => quitarDelCarrito(item.id)}
                            >
                              ✖
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded">
                  <span className="fs-5 fw-bold">TOTAL A PAGAR:</span>
                  <span className="fs-4 fw-bold text-success">S/ {totalVenta.toFixed(2)}</span>
                </div>

                <Button
                  type="submit"
                  variant="success"
                  size="lg"
                  className="w-100 fw-bold"
                  disabled={carrito.length === 0}
                >
                  ✅ Confirmar Venta y Descontar Stock
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Historial de ventas realizadas */}
      <Card className="shadow-sm">
        <Card.Header className="fw-bold">
          📋 Historial de Ventas Registradas ({ventas.length})
        </Card.Header>
        <Card.Body>
          {ventas.length === 0 ? (
            <p className="text-muted mb-0">Aún no se han registrado ventas en este turno.</p>
          ) : (
            <Table responsive striped hover size="sm">
              <thead>
                <tr>
                  <th># Boleta</th>
                  <th>Fecha y Hora</th>
                  <th>Cliente</th>
                  <th>Productos Vendidos</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <tr key={v.id}>
                    <td><code>BOL-{v.id}</code></td>
                    <td>{v.fecha}</td>
                    <td>{v.cliente}</td>
                    <td>
                      {v.items.map((i) => `${i.cantidad}x ${i.nombre}`).join(', ')}
                    </td>
                    <td className="fw-bold text-success">S/ {v.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Ventas;