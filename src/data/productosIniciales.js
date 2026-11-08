export const productosIniciales = [
  {
    id: 1,
    codigo: "MED-001",
    nombre: "Paracetamol 500mg (Caja x 100 tab)",
    categoria: "Analgésicos",
    precio: 15.50,
    stock: 45,
    stockMinimo: 15
  },
  {
    id: 2,
    codigo: "MED-002",
    nombre: "Amoxicilina 500mg (Caja x 50 cap)",
    categoria: "Antibióticos",
    precio: 28.00,
    stock: 6, // ¡Bajo stock! Activará la alerta automática
    stockMinimo: 10
  },
  {
    id: 3,
    codigo: "MED-003",
    nombre: "Ibuprofeno 400mg (Blíster x 10 tab)",
    categoria: "Antiinflamatorios",
    precio: 3.50,
    stock: 8, // ¡Bajo stock! Activará la alerta automática
    stockMinimo: 20
  },
  {
    id: 4,
    codigo: "MED-004",
    nombre: "Omeprazol 20mg (Frasco x 30 cap)",
    categoria: "Gastrointestinal",
    precio: 12.00,
    stock: 30,
    stockMinimo: 10
  },
  {
    id: 5,
    codigo: "MED-005",
    nombre: "Loratadina 10mg (Blíster x 10 tab)",
    categoria: "Antialérgicos",
    precio: 4.00,
    stock: 4, // ¡Bajo stock! Activará la alerta automática
    stockMinimo: 12
  }
];