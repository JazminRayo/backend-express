let editMode = false;
let carroIdEdit = null;

async function obtenerCarros() {
  const response = await fetch('/api/concesionarioJR');
  const data = await response.json();

  const lista = document.getElementById('carro-lista');
  lista.innerHTML = '';

  data.concesionarioJR.forEach(carro => {
    lista.innerHTML += `
      <div class="col-md-4">
        <div class="card moto-card">
          <div class="card-body moto-card-body">
            <h5>${carro.marca} ${carro.modelo}</h5>
            <p>Año: ${carro.año} | Precio: $${carro.precio}</p>
            <p>Kilometraje: ${carro.kilometraje} km</p>

            <button class="btn btn-warning btn-sm" onclick="editarCarro('${carro._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarCarro('${carro._id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  });
}

document.getElementById('carro-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const carroData = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    año: document.getElementById('año').value,
    precio: document.getElementById('precio').value,
    kilometraje: document.getElementById('kilometraje').value,
    descripcion: document.getElementById('descripcion').value
  };

  try {
    let response;

    if (editMode) {
      response = await fetch(`/api/concesionarioJR/${carroIdEdit}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carroData)
      });
    } else {
      response = await fetch('/api/concesionarioJR', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carroData)
      });
    }

    const result = await response.json();
    alert(result.msg || 'Operación exitosa');

    resetForm();
    obtenerCarros();

  } catch (error) {
    alert('Hubo un error al guardar el vehículo');
  }
});

async function eliminarCarro(id) {
  if (confirm('¿Seguro que deseas eliminar este vehículo?')) {
    const res = await fetch(`/api/concesionarioJR/${id}`, { method: 'DELETE' });
    const result = await res.json();
    alert(result.msg || 'Vehículo eliminado');
    obtenerCarros();
  }
}

function editarCarro(id) {
  fetch(`/api/concesionarioJR/${id}`)
    .then(res => res.json())
    .then(data => {
      const c = data.concesionario;

      document.getElementById('marca').value = c.marca;
      document.getElementById('modelo').value = c.modelo;
      document.getElementById('año').value = c.año;
      document.getElementById('precio').value = c.precio;
      document.getElementById('kilometraje').value = c.kilometraje;
      document.getElementById('descripcion').value = c.descripcion;

      document.getElementById('form-title').textContent = 'Editar Vehículo';
      editMode = true;
      carroIdEdit = id;
    });
}

function cancelarEdicion() {
  resetForm();
}

function resetForm() {
  document.getElementById('carro-form').reset();
  document.getElementById('form-title').textContent = 'Agregar Vehículo';
  editMode = false;
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Iniciar carga
obtenerCarros();
