const apiUrlClientes = 'http://localhost:8080/api/clientes';

async function cargarClientes() {
    const response = await fetch(apiUrlClientes);
    const clientes = await response.json();
    const container = document.getElementById('clientes-container');
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

cargarClientes();