# Anotações do projeto - Visualização e Gerenciamento de Usuários na Tabela

Foi criado uma váriavel const chamado infor_clientes para armazenar o caminho relativo para o arquivo clientes.json

```javascript
const infor_clientes = "../clientes.json";
```

A função **lerBaseDados** é uma função assícrona em JavScript que utiliza uma API **fecth** para fazer uma solicitação HTTP para a URL chamada **infor_clientes**

**Async:** É usada em funções JavaScript para indicar que a função será assíncrona.
Isso significa que a função pode conter operações assíncronas, como chamadas de API, leitura de arquivos ou consultas a bancos de dados, que não bloqueiam o thread principal de execução. Em vez disso, a função permite que o código continue sendo executado enquanto aguarda a conclusão da operação assíncrona.

- 1.  **async () => {...}:** Esta é uma função anônima assíncrona definida usando a sintaxe de arrow function. Ela não tem parâmetros de entrada.

- 2.  **return await fetch(infor_clientes):** A primeira linha dentro da função utiliza o fetch para fazer uma solicitação HTTP para o recurso especificado em infor_clientes. O await é usado para esperar que a solicitação seja concluída antes de continuar a execução do código. O resultado da solicitação HTTP (um objeto Response) é retornado.

- 3. **.then((resultado) => resultado.json()):** Em seguida, a função utiliza o método .then para processar o resultado da solicitação HTTP. O método .json() é chamado no objeto resultado para analisar o conteúdo JSON da resposta e retornar uma Promise que representa os dados JSON. 

- 4. **.then((data) => data):** Este .then simplesmente passa adiante os dados JSON resultantes sem modificar.

- 5. **.catch((error) => {...}):** Se ocorrer algum erro durante a solicitação HTTP ou ao analisar os dados JSON, o código no bloco catch será executado. Isso inclui a exibição de uma mensagem de erro no console e a devolução de um array vazio [].

Portanto, a função lerBaseDeDados basicamente faz uma solicitação HTTP para o arquivo clientes.json, aguarda os dados JSON da resposta e retorna esses dados ou um array vazio em caso de erro. Note que, para usar essa função, você precisará chamar lerBaseDeDados() em algum lugar do seu código para iniciar a operação. Além disso, certifique-se de que o caminho para clientes.json esteja correto e que o servidor esteja configurado para atender a essa solicitação.

```javascript

lerBaseDeDados = async () => {
  return await fetch(infor_clientes)
    .then((resultado) => resultado.json())
    .then((data) => data)
    .catch((error) => {
      console.error("lerBaseDeDados: ", error);
      return [];
    });
};
```
````javascript

window.clientes = lerBaseDeDados();

addClienteTable = async (dados) => {

    const infor = await dados;

    console.log(infor);

    let layout_tr = ``;

    await infor.forEach( async (cliente, i) => {
        layout_tr +=
        `
            <tr>
                <th scope="row">${i}</th>
                <td>${cliente.name}</td>
                <td>${cliente.email}</td>
                <td>${cliente.address}</td>
                <td>${cliente.city}</td>
                <td>${cliente.state}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.phoneNumber}</td>
                <td>
                    <button id="edita-${i}" onclick="editar(this)" type="button" class="btn btn-primary">Editar</button>

                    <button id="deletar-${i}" onclick="deletar(this)" type="button" class="btn btn-danger">Deletar</button>
                </td>
            </tr>
        `
    })

    document.querySelector("tbody").innerHTML = layout_tr;

}

addClienteTable(window.clientes);

buscar = async () => {

    const text_name = document.getElementById("pesquisar").value.toLocaleLowerCase();

    const infor = await window.clientes;

    let filter_clientes = infor.filter((cliente) => cliente.name.toLocaleLowerCase().includes(text_name))

    await addClienteTable(filter_clientes);

}

deletar = async (e) => {
console.log(e.id);
