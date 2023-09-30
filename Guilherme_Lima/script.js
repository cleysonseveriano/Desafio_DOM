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

showModal = () => {
    let meuModal = new bootstrap.Modal(document.getElementById("infor"))
    meuModal.show();
}

deletar = async (e) => {
    console.log(e.id)
    
    showModal();
}

editar = async (e) => {
    const ID = parseInt(e.id.split("editar-")[1])
    const infor = await window.clientes;

    // FILTRAR PELO EMAIL
    const EMAIL_INFOR = document.getElementById(`email-${ID}`).innerHTML
    let filter_clientes = infor.filter((cliente) => 
    cliente.email === EMAIL_INFOR
    );

    showModal();
    const NAME = document.getElementById('infor-name')
    const EMAIL = document.getElementById('infor-email')
    const ADDRESS = document.getElementById('infor-anddress')
    const CITY = document.getElementById('infor-city')
    const STATE = document.getElementById('infor-state')
    const CEP = document.getElementById('infor-cep')
    const PHONE_NUMBER = document.getElementById('infor-phoneNumber')

    NAME.value = filter_clientes[0].name
    EMAIL.value =   filter_clientes[0].email
    ADDRESS.value = filter_clientes[0].address
    CITY.value =    filter_clientes[0].city
    STATE.value = filter_clientes[0].state
    CEP.value = filter_clientes[0].cep
    PHONE_NUMBER.value = filter_clientes[0].phoneNumber

    const ENVIAR = document.getElementById('enviar')

    ENVIAR.innerHTML = "Alterar"
    ENVIAR.setAttribute("data-type", "editar")

    const TITLE = document.getElementById("infor-title")
    TITLE.innerHTML = `Editar: ${filter_clientes[0].name}` 
}