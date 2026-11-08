import { useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Button, Badge, InputGroup } from 'react-bootstrap';

function Inventario({ productos, agregarProducto, reabastecerRapido, eliminarProducto }) {
  const [busqueda, setBusqueda] = useState('');
  const [nuevo, setNuevo] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Analgésicos',
    precio: '',
    stock: '',
    stockMinimo: 10
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProducto({
      ...nuevo,
      precio: parseFloat(nuevo.precio),
      stock: parseInt(nuevo.stock, 10),
      stockMinimo: parseInt(nuevo.stockMinimo, 10)
    });
    setNuevo({ codigo: '', nombre: '', categoria: 'Analgésicos', precio: '', stock: '', stockMinimo: 10 });
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container>
      <h2 className="mb-4 fw-bold">📦 Gestión Centralizada de Inventario</h2>

      <Row>
        {/* Formulario para agregar medicamentos */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white fw-bold">
              Registrar Nuevo Medicamento
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Código</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: MED-006"
                    value={nuevo.codigo}
                    onChange={(e) => setNuevo({ ...nuevo, codigo: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Nombre del Medicamento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Azitromicina 500mg"
                    value={nuevo.nombre}
                    onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Select
                    value={nuevo.categoria}
                    onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
                  >
                    <option>Analgésicos</option>
                    <option>Antibióticos</option>
                    <option>Antiinflamatorios</option>
                    <option>Gastrointestinal</option>
                    <option>Antialérgicos</option>
                    <option>Vitaminas y Suplementos</option>
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Precio (S/)</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.10"
                        min="0.10"
                        value={nuevo.precio}
                        onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Stock Inicial</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        value={nuevo.stock}
                        onChange={(e) => setNuevo({ ...nuevo, stock: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Stock Mínimo (Alerta)</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={nuevo.stockMinimo}
                    onChange={(e) => setNuevo({ ...nuevo, stockMinimo: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 fw-bold">
                  + Guardar en Inventario
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Tabla de inventario en tiempo real */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <InputGroup className="mb-3">
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre, código o categoría..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </InputGroup>

              <Table responsive striped bordered hover className="align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Código</th>
                    <th>Medicamento</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosFiltrados.map((prod) => {
                    const esBajo = prod.stock <= prod.stockMinimo;
                    return (
                      <tr key={prod.id}>
                        <td><code>{prod.codigo}</code></td>
                        <td>
                          <div className="fw-bold">{prod.nombre}</div>
                          <small className="text-muted">{prod.categoria}</small>
                        </td>
                        <td>S/ {prod.precio.toFixed(2)}</td>
                        <td className="fw-bold">{prod.stock}</td>
                        <td>
                          {esBajo ? (
                            <Badge bg="danger">Bajo Stock (Mín: {prod.stockMinimo})</Badge>
                          ) : (
                            <Badge bg="success">Óptimo</Badge>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => reabastecerRapido(prod.id, 10)}
                              title="Sumar 10 unidades"
                            >
                              +10
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => eliminarProducto(prod.id)}
                              title="Eliminar producto"
                            >
                              🗑️
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Inventario;