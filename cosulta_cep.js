//preencher o formulário com os dados de retorno de API
function preencherFormulario(endereco) {
    document.getElementById("endereco").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.localidade;
    document.getElementById("estado").value = endereco.uf;
    document.getElementById("ibge").value = endereco.ibge;
    document.getElementById("ddd").value = endereco.ddd;
    document.getElementById("siafi").value = endereco.siafi;
    document.getElementById("api").value = endereco.api;
} 

//Verifica se o que foi digitado pelo usuário é somente número
function eNumero(numero) {
    return /^[0-9]+$/.test(numero);
}

// Verifica se o CEP possui tamanho 8 e só possui números
function cepValido(cep) {
    return cep.length == 8 && eNumero(cep);
    //vai testar t ou f se é numero retorna o numero
}

// Função para pesquisar o CEP via API
async function pesquisarCEP() {

    const cep = document.getElementById("cep").value.replace("-", "");
    //Replace = quando vc encontrar o traço "-" troca por nada "";
    // Pois quero limitar para receber só numeros
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
         //wait -- esperar o retorno das informações
        //fetch -- metodo de busca de recurso de rede quando a resposta estiver disponivel - busca url
        //url -- endereço do servidor
        const endereco = await dados.json();
        console.log(endereco);

        if (endereco.hasOwnProperty("erro")) {
            document.getElementById("endereco").value = "CEP não encontrado!";

        } else {
            preencherFormulario(endereco);
        }
        
        preencherFormulario(endereco);
    } else {
        // Se o CEP estiver incorreto, ou preenchido de forma errada, os campos relacionados ao endereço serão
        // limpos, e serão exibidas mensagens de erro nos campos de CEP e endereço
        limparcampos(endereco);
        document.getElementById("endereco").value = "CEP incorreto";
        document.getElementById("cep").value = "Erro";
    }
}


// Pesquisar cep
document.getElementById("cep").addEventListener("focusout", pesquisarCEP);


// execução do botão limpar
function limparcampos(endereco) {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("ibge").value = "";
    document.getElementById("ddd").value = "";
    document.getElementById("siafi").value = "";
    document.getElementById("api").value ="";
}   

// Execução do botão limpar
document.getElementById("limpar").addEventListener("click", (e) => {
    limparcampos(endereco);
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
})

// Salvar mostra as informações de api
document.getElementById("salvar").addEventListener("click", (e) => {
    if (document.getElementById("cep").value != "") {
        alert(document.getElementById("endereco").value + "\n" +
        document.getElementById("bairro").value + "\n" +
        document.getElementById("cidade").value + "\n"  +
        document.getElementById("estado").value + "\n"  +
        document.getElementById("ibge").value + "\n"  +
        document.getElementById("ddd").value + "\n"  +
        document.getElementById("siafi").value + "\n" +
        document.getElementById("api").value);
    } 
    else {
        // Alerta de preenchimento de campos 
            alert("Preencha os campos")
        }
})


