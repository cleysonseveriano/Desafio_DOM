let infoClientes = "../clientes.json"

async function lerDados() {
  const response = await fetch(infoClientes)
  const data = await response.json()
  
  return data
}

let clientes = lerDados()

async function adicionarClientesNaTabela(dados) {

  let clientes = await dados

  let layout_tr = ""

  clientes.forEach((cliente, id) => {
    layout_tr +=
    `
      <tr>
        <th scope="row">${id}</th>
        <td>${cliente.name}</td>
        <td>${cliente.email}</td>
        <td>${cliente.address}</td>
        <td>${cliente.city}</td>
        <td>${cliente.state}</td>
        <td>${cliente.cep}</td>
        <td>${cliente.phoneNumber}</td>
        <td>
          <button id="edita${id}" type="button" class="btn btn-primary">Editar</button>
          <button id="excluir${id}" type="button" class="btn btn-danger" onclick="deletar(${id})">Excluir</button>
        </td>
      </tr>
    `
  })

  document.querySelector("tbody").innerHTML = layout_tr
}

adicionarClientesNaTabela(clientes)

async function buscar(){
  const text_name = document.getElementById("pesquisar").value.toLocaleLowerCase()
  const dadosFiltrados = await clientes
  let filter_clientes = dadosFiltrados.filter((cliente) => cliente.name.toLocaleLowerCase().includes(text_name)) //esse novo array criado possui seus próprios indices e isso choca com o array geral na hora de excluir. ex: se o retorno for um único cliente, ele terá o indice "0" e portanto o cliente de indice "0" do array "clientes" será excluído
  adicionarClientesNaTabela(filter_clientes)
}

async function deletar(i) {
  const dados = await clientes
  const clienteDel = dados.splice(i, 1)
  const novaLista = dados.filter(cliente => cliente.name !== clienteDel.name) //criei esse novo array, porque pod ser que utilizando o filtro da busca possa aparecer mais de um resultado, porém dificilmente o nome completo será identico
  adicionarClientesNaTabela(novaLista)
}