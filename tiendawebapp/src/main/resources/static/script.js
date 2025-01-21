const apiUrlClientes = 'http://localhost:8080/api/clientes';
const apiUrlComerciales = 'http://localhost:8080/api/comerciales';
const apiUrlPedidos = 'http://localhost:8080/api/pedidos';

function cargarClientes() {
    fetch(apiUrlClientes)
        .then(response => response.json())
        .then(data => {
            const clientesDiv = document.getElementById('clientes');
            clientesDiv.innerHTML = '<h3>Clientes</h3>';
            const table = crearTabla(['ID', 'Nombre', 'Apellido1', 'Apellido2', 'Ciudad', 'Categoría']);
            data.forEach(cliente => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellido1}</td>
                    <td>${cliente.apellido2 || ''}</td>
                    <td>${cliente.ciudad || ''}</td>
                    <td>${cliente.categoria}</td>
                `;
            });
            clientesDiv.appendChild(table);
        })
        .catch(error => console.error('Error al cargar los clientes:', error));
}

function cargarComerciales() {
    fetch(apiUrlComerciales)
        .then(response => response.json())
        .then(data => {
            const comercialesDiv = document.getElementById('comerciales');
            comercialesDiv.innerHTML = '<h3>Comerciales</h3>';
            const table = crearTabla(['ID', 'Nombre', 'Apellido1', 'Apellido2', 'Comisión']);
            data.forEach(comercial => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${comercial.id}</td>
                    <td>${comercial.nombre}</td>
                    <td>${comercial.apellido1}</td>
                    <td>${comercial.apellido2 || ''}</td>
                    <td>${comercial.comision}</td>
                `;
            });
            comercialesDiv.appendChild(table);
        })
        .catch(error => console.error('Error al cargar los comerciales:', error));
}

function cargarPedidos() {
    fetch(apiUrlPedidos)
        .then(response => response.json())
        .then(data => {
            const pedidosDiv = document.getElementById('pedidos');
            pedidosDiv.innerHTML = '<h3>Pedidos</h3>';
            const table = crearTabla(['ID', 'Total', 'ID Cliente', 'ID Comercial']);
            data.forEach(pedido => {
                const row = table.insertRow();
                row.innerHTML = `
                    <td>${pedido.id}</td>
                    <td>${pedido.total}</td>
                    <td>${pedido.idCliente}</td>
                    <td>${pedido.idComercial}</td>
                `;
            });
            pedidosDiv.appendChild(table);
        })
        .catch(error => console.error('Error al cargar los pedidos:', error));
}

function crearTabla(headers) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered');
    const thead = table.createTHead();
    const row = thead.insertRow();
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        row.appendChild(th);
    });
    table.createTBody();
    return table;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarClientes();
    cargarComerciales();
    cargarPedidos();
});