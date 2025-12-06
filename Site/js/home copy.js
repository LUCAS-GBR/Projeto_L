    //codigo do carrossel
document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '#image-carousel', {
         type :     'loop',
         autoplay: 'true',
         arrows: false,
         pagination: false,

    } ).mount();
  } );


    //Função dos produtos no main


// fetch pega os dados da api deste endereço
fetch('http://localhost:3000/produtos')
    //transforma em json
    .then(response => response.json())
    .then(data => {
        let html = '';
        // percorre todos os produtos e cria um card pra cada
        data.forEach(produto => {
            //adiciona o script do html dentro da variavel html para ser injetado no corpo da pagina
            html += `
                <a href="produtos/produto.html?id=${produto.idproduto}">
                    <div class="produto">
                        <img class="shirt" src="produtos_img/${produto.idproduto}/0.jpg" alt="">
                            <strong>
                                <p>${produto.nome} ${produto.temporada}</p>
                            </strong>
                            <p>R$${produto.preco}</p>
                       
                        <div class="btncontainer">
                            <a href=".//produtos/produto.html"><button class="buybtn">Comprar</button></a>
                            <!--Nome e Preco, interação com carrinho--> <!--Id necessario pra -->
                            <button onclick="addcart('${produto.nome}', ${produto.preco},'M','${produto.idproduto}')" class="buybtn liveToastBtn"><img
                                    src="img/Addcarrinho.png" alt=""></button>
                        </div>
                </a>
            </div>
            `;
        });
        // injeta o html no corpo da página
        document.getElementById('produtos').innerHTML = html;
    })
    // se der erro, mostra no console
    .catch(error => console.error('Erro ao carregar produtos:', error));

    //Função carrinho
let carrinho = [];
let total = 0;
let itenstotal = 0;

function addcart(nome, preco,tamanho,idproduto) {
     carrinho.push({nome, preco, tamanho, idproduto});
     total += preco;
     itenstotal++;
     atualizarCarrinho();
}


function atualizarCarrinho() {
     const lista = document.getElementById("carrinho-lista");
     const totalSpan = document.getElementById("total");

     lista.innerHTML = "";
     carrinho.forEach((item, index) => {
          lista.innerHTML += `<li><div>
               <img src="../Produtos_img/${item.idproduto}/0.jpg" alt=""> ${item.nome} <br> Tamanho: ${item.tamanho} <br> R$ ${item.preco.toFixed(2)}
                      <button onclick="removerItem(${index})">Remover</button>
          </div></li>`;
        
     });

     totalSpan.textContent = total.toFixed(2);
     document.getElementById("itens-on-cart").innerHTML = `${itenstotal}`;
     
     //adiciona botão limpar carrinho
     if (itenstotal !== 0) {
        document.getElementById('Btn-limpar').innerHTML = `<button onclick="limparCarrinho()" class="limparCarrinho">Limpar carrinho</button>`;
        document.getElementById('Btn-comprar').innerHTML = `<a href=""><button>Finalizar compra</button></a>`;
    };
}

function removerItem(index) {
     total -= carrinho[index].preco;
     itenstotal--;
     atualizarCarrinho();
     if (itenstotal === 0) {
        document.getElementById('Btn-limpar').innerHTML = '';
        document.getElementById('Btn-comprar').innerHTML = '';
}}

function limparCarrinho(){
     carrinho = [];
     total = 0;
     itenstotal = 0;
     atualizarCarrinho();
    document.getElementById('Btn-limpar').innerHTML = '';
    document.getElementById('Btn-comprar').innerHTML = '';
}



    //Mensagem de adicionado ao carrinho
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.querySelectorAll('.liveToast')
    
    if (toastTrigger) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }

//Função Pesquisa


