import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ iniciarSesion }) {
  const [usuarioInput, setUsuarioInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuarioInput === 'admin' && passwordInput === '1234') {
      iniciarSesion({ nombre: 'Farmacéutico Principal', rol: 'Administrador' });
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Usa usuario: admin y contraseña: 1234');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '85vh' }}>
      <Card style={{ width: '400px' }} className="shadow">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-primary">🏥 Nova Salud</h2>
            <p className="text-muted">Sistema de Inventario y Ventas</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa: admin"
                value={usuarioInput}
                onChange={(e) => setUsuarioInput(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa: 1234"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 fw-bold">
              Ingresar al Sistema Seguro
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <small className="text-muted">
              🔒 Acceso protegido — Credenciales de prueba: <b>admin / 1234</b>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;