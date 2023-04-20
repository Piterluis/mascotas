const selectDueno = document.getElementById('dueno');
const form = document.querySelector('form');

// Función para obtener los dueños de la base de datos
async function obtenerDuenos() {
  const response = await fetch('http://127.0.0.1:3050/duenos1');
  const duenos = await response.json();

  // Agregar cada dueño como opción en el select
  duenos.forEach((dueno) => {
    const option = document.createElement('option');
    option.value = dueno.id;
    option.text = dueno.nombre;
    selectDueno.add(option);
  });
}

// Llamada a la función para obtener los dueños al cargar la página
obtenerDuenos();

// Función para enviar los datos de la mascota al servidor
async function registrarMascota(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  const dueno = document.getElementById('dueno').value;

  const response = await fetch('http://127.0.0.1:3050/add_mascota', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nombre,edad, dueno })
  }).then(response => response.json())
  .then(data => {
    console.log('Mascota registrada:', data);
    alert('Mascota registrada exitosamente');
    mascotaForm.reset();
  })
  .catch(error => {
    console.error('Error al registrar la mascota:', error);
    alert('Error al registrar la mascota');
  });;

  
}

form.addEventListener('submit', registrarMascota);
