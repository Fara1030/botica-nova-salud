import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function NavbarBotica({ usuario, cerrarSesion, cantidadAlertas }) {
  const navigate = useNavigate();

  const handleSalir = () => {
    cerrarSesion();
    navigate('/login');
  };

  if (!usuario) return null;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🏥 Botica Nova Salud
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-botica" />
        <Navbar.Collapse id="menu-botica">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Panel y Alertas{' '}
              {cantidadAlertas > 0 && (
                <Badge bg="danger" pill>{cantidadAlertas}</Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/ventas">
              🛒 Atención y Ventas (POS)
            </Nav.Link>
            <Nav.Link as={Link} to="/inventario">
              📦 Inventario Centralizado
            </Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white gap-3">
            <span>👤 {usuario.nombre} ({usuario.rol})</span>
            <Button variant="outline-light" size="sm" onClick={handleSalir}>
              Cerrar Sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarBotica;