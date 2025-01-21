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
                        <td>${pedido.cliente.nombre} ${pedido.cliente.apellido1}</td>
                        <td>${pedido.comercial.nombre} ${pedido.comercial.apellido1}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

cargarClientes();
cargarComerciales();
cargarPedidos();