const apiUrlClientes = 'http://localhost:8080/api/clientes';
const apiUrlComerciales = 'http://localhost:8080/api/comerciales';
const apiUrlPedidos = 'http://localhost:8080/api/pedidos';

// Función para convertir celdas en campos editables
function hacerEditable(td) {
    // Evitar que se haga editable si ya hay un input
    if (td.querySelector('input')) return;

    const valorOriginal = td.textContent.trim(); 
    td.innerHTML = `<input type="text" class="form-control form-control-sm" value="${valorOriginal}" onblur="guardarEdicion(this)">`;
    td.querySelector('input').focus(); 
}

// Guardar cambios al perder el foco del input
function guardarEdicion(input) {
    const td = input.parentElement; 
    const nuevoValor = input.value.trim(); 
    td.textContent = nuevoValor; 
}

// Función para obtener valores editados de una fila
function obtenerValoresEditados(fila) {
    const inputs = fila.querySelectorAll('input');
    return Array.from(inputs).map(input => input.value.trim());
}

async function cargarClientes() {
    const response = await fetch(apiUrlClientes);
    const clientes = await response.json();
    const container = document.getElementById('clientes-container'); // Cambiado para que solo afecte la tabla
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido1</th>
                    <th>Apellido2</th>
                    <th>Ciudad</th>
                    <th>Categoria</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${clientes.map(cliente => `
                    <tr data-id="${cliente.id}">
                        <td>${cliente.id}</td>
                        <td onclick="hacerEditable(this)">${cliente.nombre}</td>
                        <td onclick="hacerEditable(this)">${cliente.apellido1}</td>
                        <td onclick="hacerEditable(this)">${cliente.apellido2 || ''}</td>
                        <td onclick="hacerEditable(this)">${cliente.ciudad || ''}</td>
                        <td onclick="hacerEditable(this)">${cliente.categoria || ''}</td>
                        <td>
                            <button onclick="modificarCliente(this)" class="btn btn-primary btn-sm">Modificar</button>
                            <button onclick="eliminarCliente(${cliente.id})" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function modificarCliente(boton) {
    const fila = boton.closest('tr');
    const id = fila.getAttribute('data-id');
    guardarClienteEditado(id, fila)
}

async function guardarClienteEditado(id, fila) {
    const celdas = fila.querySelectorAll('td');
    const cliente = {
        id: id,
        nombre: celdas[1].textContent.trim(),
        apellido1: celdas[2].textContent.trim(),
        apellido2: celdas[3].textContent.trim() || null,
        ciudad: celdas[4].textContent.trim() || null,
        categoria: parseInt(celdas[5].textContent.trim()) || null
    };

    // Enviar el objeto Cliente al backend
    const response = await fetch(`${apiUrlClientes}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    });

    if (response.ok) {
        alert('Cliente actualizado correctamente.');
    } else {
        alert('Error al actualizar el cliente.');
    }

    cargarClientes(); 
}

async function cargarComerciales() {
    const response = await fetch(apiUrlComerciales);
    const comerciales = await response.json();
    const container = document.getElementById('comerciales-container');
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido1</th>
                    <th>Apellido2</th>
                    <th>Comisión</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${comerciales.map(comercial => `
                    <tr data-id="${comercial.id}">
                        <td>${comercial.id}</td>
                        <td onclick="hacerEditable(this)">${comercial.nombre}</td>
                        <td onclick="hacerEditable(this)">${comercial.apellido1}</td>
                        <td onclick="hacerEditable(this)">${comercial.apellido2 || ''}</td>
                        <td onclick="hacerEditable(this)">${comercial.comision}</td>
                        <td>
                            <button onclick="modificarComercial(this)" class="btn btn-primary btn-sm">Modificar</button>
                            <button onclick="eliminarComercial(${comercial.id})" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function modificarComercial(boton) {
    const fila = boton.closest('tr');
    const id = fila.getAttribute('data-id');
    guardarComercialEditado(id, fila);    
}

async function guardarComercialEditado(id, fila) {
    const celdas = fila.querySelectorAll('td');
    const comercial = {
        id: id,
        nombre: celdas[1].textContent.trim(),
        apellido1: celdas[2].textContent.trim(),
        apellido2: celdas[3].textContent.trim() || null,
        comision: celdas[4].textContent.trim() || null
    };

    // Enviar el objeto Cliente al backend
    const response = await fetch(`${apiUrlComerciales}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comercial)
    });

    if (response.ok) {
        alert('Comercial actualizado correctamente.');
    } else {
        alert('Error al actualizar el comercial.');
    }

    cargarComerciales();
}

async function cargarPedidos() {
    const response = await fetch(apiUrlPedidos);
    const pedidos = await response.json();
    const container = document.getElementById('pedidos-container');
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Total</th>
                    <th>Cliente</th>
                    <th>Comercial</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${pedidos.map(pedido => `
                    <tr>
                        <td>${pedido.id}</td>
                        <td contenteditable="true">${pedido.total}</td>
                        <td data-cliente-id="${pedido.cliente?.id || ''}">
                            ${pedido.cliente ? `${pedido.cliente.nombre} ${pedido.cliente.apellido1}` : ''}
                        </td>
                        <td data-comercial-id="${pedido.comercial?.id || ''}">
                            ${pedido.comercial ? `${pedido.comercial.nombre} ${pedido.comercial.apellido1}` : ''}
                        </td>
                        <td>
                            <button onclick="guardarPedidoEditado(${pedido.id}, this.parentElement.parentElement)" 
                                class="btn btn-primary btn-sm">Modificar</button>
                            <button onclick="eliminarPedido(${pedido.id})" 
                                class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function modificarPedido(boton) {
    const fila = boton.closest('tr');
    const id = fila.getAttribute('data-id');
    guardarPedidoEditado(id, fila);
}

async function guardarPedidoEditado(id, fila) {
    const celdas = fila.querySelectorAll('td');

    // Construir el objeto Pedido completo
    const pedido = {
        id: id,
        total: parseFloat(celdas[1].textContent.trim()),
        cliente: {
            id: parseInt(celdas[2].dataset.clienteId) // ID del cliente almacenado en un atributo data
        },
        comercial: {
            id: parseInt(celdas[3].dataset.comercialId) // ID del comercial almacenado en un atributo data
        }
    };

    // Enviar el objeto Pedido al backend
    const response = await fetch(`${apiUrlPedidos}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
    });

    if (response.ok) {
        alert('Pedido actualizado correctamente.');
    } else {
        alert('Error al actualizar el pedido.');
    }

    cargarPedidos(); // Recargar la lista de pedidos
}

async function eliminarCliente(id) {
    await fetch(`${apiUrlClientes}/${id}`, { method: 'DELETE' });
    cargarClientes();
}

async function eliminarComercial(id) {
    await fetch(`${apiUrlComerciales}/${id}`, { method: 'DELETE' });
    cargarComerciales();
}

async function eliminarPedido(id) {
    await fetch(`${apiUrlPedidos}/${id}`, { method: 'DELETE' });
    cargarPedidos();
}

// Mostrar y ocultar formularios
function mostrarFormularioCliente() {
    document.getElementById('formulario-cliente').style.display = 'block';
}

function ocultarFormularioCliente() {
    document.getElementById('formulario-cliente').style.display = 'none';
}

function mostrarFormularioComercial() {
    document.getElementById('formulario-comercial').style.display = 'block';
}

function ocultarFormularioComercial() {
    document.getElementById('formulario-comercial').style.display = 'none';
}

function mostrarFormularioPedido() {
    document.getElementById('formulario-pedido').style.display = 'block';
}

function ocultarFormularioPedido() {
    document.getElementById('formulario-pedido').style.display = 'none';
}

// Funciones para crear elementos
async function crearCliente() {
    const cliente = {
        nombre: document.getElementById('cliente-nombre').value.trim(),
        apellido1: document.getElementById('cliente-apellido1').value.trim(),
        apellido2: document.getElementById('cliente-apellido2').value.trim(),
        ciudad: document.getElementById('cliente-ciudad').value.trim(),
        categoria: parseInt(document.getElementById('cliente-categoria').value.trim())
    };

    const response = await fetch(apiUrlClientes, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente)
    });

    if (response.ok) {
        alert('Cliente creado con éxito');
        cargarClientes();
    } else {
        alert('Error al crear el cliente');
    }

    ocultarFormularioCliente();
}

async function crearComercial() {
    const comercial = {
        nombre: document.getElementById('comercial-nombre').value.trim(),
        apellido1: document.getElementById('comercial-apellido1').value.trim(),
        apellido2: document.getElementById('comercial-apellido2').value.trim(),
        comision: parseFloat(document.getElementById('comercial-comision').value.trim())
    };

    const response = await fetch(apiUrlComerciales, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comercial)
    });

    if (response.ok) {
        alert('Comercial creado con éxito');
        cargarComerciales();
    } else {
        alert('Error al crear el comercial');
    }

    ocultarFormularioComercial();
}

async function crearPedido() {
    const pedido = {
        total: parseFloat(document.getElementById('pedido-total').value.trim()),
        cliente: { id: parseInt(document.getElementById('pedido-id-cliente').value.trim()) },
        comercial: { id: parseInt(document.getElementById('pedido-id-comercial').value.trim()) }
    };

    const response = await fetch(apiUrlPedidos, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    });

    if (response.ok) {
        alert('Pedido creado con éxito');
        cargarPedidos();
    } else {
        alert('Error al crear el pedido');
    }

    ocultarFormularioPedido();
}

cargarClientes();
cargarComerciales();
cargarPedidos();