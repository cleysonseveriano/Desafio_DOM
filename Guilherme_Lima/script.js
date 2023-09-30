const info_clientes = "../clientes.json"

lerBaseDeDados = async () => {
    return await fetch(info_clientes)
    .then((resultado) => resultado.json())
    .then((data) => data)
    .catch((error) => {
        console.error("lerBaseDeDados: ", error)
        return []
    });
}

window.clientes = lerBaseDeDados()

addClientesTable = async (dados) => {
    const infor = await dados;

    console.log("infor ", infor)

    let layout_tr = ``

    await infor.forEach( async (cliente, i) => {
        layout_tr += 
        `
        <tr>
        <th scope="row">${i}</th>
        <td>${cliente.name}</td>
        <td id="email-${i}">${cliente.email}</td>
        <td>${cliente.address}</td>
        <td>${cliente.city}</td>
        <td>${cliente.state}</td>
        <td>${cliente.cep}</td>
        <td>${cliente.phoneNumber}</td>
        <td>
            <button id="editar-${i}" onclick="editar(this)" type="button" class="btn btn-primary">Editar</button>

            <button id="deletar-${i}" onclick="deletar(this)" type="button" class="btn btn-danger">Deletar</button>
        </td>
      </tr>
       `
    })

    console.log(layout_tr)

    document.querySelector("tbody").innerHTML = layout_tr;
}
addClientesTable(window.clientes)

buscar = async () => {

    const text_name = document.getElementById('pesquisar').value

    const infor = await clientes

    let filter_clientes = infor.filter((cliente) => cliente.name.toLocaleLowerCase().includes(text_name))

    await addClientesTable(filter_clientes)
}

deletar = async (e) => {
    console.log(e.id)
    document.getElementById`email-${i}`
    
}

editar = async (e) => {
    console.log(e.id);
}