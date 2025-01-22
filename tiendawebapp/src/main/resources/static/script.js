const apiUrlClientes = 'http://localhost:8080/api/clientes';
const apiUrlComerciales = 'http://localhost:8080/api/comerciales';
const apiUrlPedidos = 'http://localhost:8080/api/pedidos';

async function cargarClientes() {
    const response = await fetch(apiUrlClientes);
    const clientes = await response.json();
    const container = document.getElementById('clientes');
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido1</th>
                    <th>Ciudad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${clientes.map(cliente => `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido1}</td>
                        <td>${cliente.ciudad}</td>                        
                        <td>
                            <button onclick="eliminarCliente(${cliente.id})" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function cargarComerciales() {
    const response = await fetch(apiUrlComerciales);
    const comerciales = await response.json();
    const container = document.getElementById('comerciales');
    container.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido1</th>
                    <th>Apellido2</th>
                    <th>Comision</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${comerciales.map(comercial => `
                    <tr>
                        <td>${comercial.id}</td>
                        <td>${comercial.nombre}</td>
                        <td>${comercial.apellido1}</td>
                        <td>${comercial.apellido2 || ''}</td>
                        <td>${comercial.comision}</td>   
                        <td>
                            <button onclick="eliminarComercial(${comercial.id})" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>                 
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function cargarPedidos() {
    const response = await fetch(apiUrlPedidos);
    const pedidos = await response.json();
    const container = document.getElementById('pedidos');
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
                        <td>${pedido.total}</td>
                        <td>${pedido.cliente != null ? pedido.cliente.nombre : ''} ${pedido.cliente != null ? pedido.cliente.apellido1 : ''}</td>
                        <td>${pedido.comercial != null ? pedido.comercial.nombre: ''} ${pedido.comercial != null ? pedido.comercial.apellido1: ''}</td>
                        <td>
                            <button onclick="eliminarPedido(${pedido.id})" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
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

cargarClientes();
cargarComerciales();
cargarPedidos();