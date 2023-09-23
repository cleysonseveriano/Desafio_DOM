// "name": "Tonya Ritchie",
// "email": "Jasmin84@yahoo.com",
// "address": "12700 Renner Pine",
// "city": "Cathrynland",
// "state": "KS",
// "cep": "21734-8270",
// "phoneNumber": "808-948-6506"

// As promessas tem três segredos, três estados. Pedidos, aceito, e erro
const info_clientes = '../clientes.json'

lerBaseDeDados = async() => {
    // Espere
    return await fetch(info_clientes)
    .then((resultado) => resultado.json())
    .then((data) => data)
    .catch((error) => {
        console.error("lerBaseDeDados: ", error);
        return [];
    })
}

let clientes = lerBaseDeDados();

addClienteTable = async (dados) => {

    const infor = await dados;
    
    console.log(infor);

    let layout_tr = ``;

    await infor.forEach(async (cliente, i) => {
        layout_tr += `
            <tr>
                <th scope="row">${i}</th>
                <td>${cliente.name}</td>
                <td>${cliente.email}</td>
                <td>${cliente.adress}</td>
                <td>${cliente.city}</td>
                <td>${cliente.state}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.phoneNumber}</td>
                <td>
                    <button id="edita-${i}" type="button" class="btn btn-primary">Editar</button>
                    <button id="edita-${i}" type="button" class="btn btn-danger">Danger</button>
                </td>
            </tr>   
        `;
    });
    document.querySelector("tbody").innerHTML = layout_tr;
}

buscar = async () => {

    const text_name = document.getElementById('pesquisar').value.toLowerCase()

    const infor = await clientes;
    
    let filter_clientes = infor.filter((cliente) => cliente.name.toLowerCase().includes(text_name))

    console.log("Buscando: ", filter_clientes)

    await addClienteTable(filter_clientes);
}