import { Container, Row, Col, Card, Alert, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Dashboard({ productos, ventas, reabastecerRapido }) {
  const productosBajoStock = productos.filter((p) => p.stock <= p.stockMinimo);
  const totalIngresos = ventas.reduce((acc, v) => acc + v.total, 0);

  return (
    <Container>
      <h2 className="mb-4 fw-bold">Panel de Control — Botica Nova Salud</h2>

      {/* Tarjetas de resumen */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <Card className="border-primary shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-primary">📦 Total Medicamentos</Card.Title>
              <h2 className="fw-bold">{productos.length} registrados</h2>
              <small className="text-muted">Control de stock en tiempo real</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="border-danger shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-danger">⚠️ Alertas de Bajo Stock</Card.Title>
              <h2 className="fw-bold text-danger">{productosBajoStock.length} productos</h2>
              <small className="text-muted">Requieren reposición inmediata</small>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="border-success shadow-sm h-100">
            <Card.Body>
              <Card.Title className="text-success">💰 Ventas Registradas</Card.Title>
              <h2 className="fw-bold text-success">S/ {totalIngresos.toFixed(2)}</h2>
              <small className="text-muted">{ventas.length} atenciones completadas</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CONDICIÓN 2: Módulo de Alertas para Reposición de Productos con Bajo Stock */}
      <Card className="shadow-sm mb-4 border-warning">
        <Card.Header className="bg-warning text-dark fw-bold d-flex justify-content-between align-items-center">
          <span>🔔 MÓDULO DE ALERTAS AUTOMÁTICAS DE REPOSICIÓN</span>
          <Badge bg="dark">{productosBajoStock.length} pendientes</Badge>
        </Card.Header>
        <Card.Body>
          {productosBajoStock.length === 0 ? (
            <Alert variant="success" className="mb-0">
              ✅ ¡Excelente! Todos los medicamentos superan el stock mínimo requerido.
            </Alert>
          ) : (
            <>
              <Alert variant="danger">
                <strong>¡Atención!</strong> Los siguientes medicamentos están por agotarse y pueden causar desabastecimiento en la botica:
              </Alert>
              <Table responsive bordered hover className="align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Código</th>
                    <th>Medicamento</th>
                    <th>Categoría</th>
                    <th>Stock Actual</th>
                    <th>Stock Mínimo</th>
                    <th>Acción Rápida</th>
                  </tr>
                </thead>
                <tbody>
                  {productosBajoStock.map((prod) => (
                    <tr key={prod.id}>
                      <td><code>{prod.codigo}</code></td>
                      <td className="fw-bold">{prod.nombre}</td>
                      <td>{prod.categoria}</td>
                      <td>
                        <Badge bg="danger" className="fs-6">{prod.stock} unid.</Badge>
                      </td>
                      <td>{prod.stockMinimo} unid.</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => reabastecerRapido(prod.id, 20)}
                        >
                          + Reponer 20 unid.
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card>

      <div className="d-flex gap-3">
        <Button as={Link} to="/ventas" variant="primary" size="lg">
          Ir a Atención al Cliente (Nueva Venta)
        </Button>
        <Button as={Link} to="/inventario" variant="outline-secondary" size="lg">
          Gestionar Inventario Completo
        </Button>
      </div>
    </Container>
  );
}

export default Dashboard;