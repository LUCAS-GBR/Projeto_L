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
fetch('https://projeto-l.onrender.com/produtos')
    //transforma em json
    .then(response => response.json())
    .then(data => {
        let html = '';
        // percorre todos os produtos e cria um card pra cada
        data.forEach(produto => {
            //adiciona o script do html dentro da variavel html para ser injetado no corpo da pagina
            html += `
                <a href="https://projeto-l.onrender.com/produtos?id=${produto.idproduto}">
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
    atualizarCarrinho();
function addcart(nome, preco,tamanho,idproduto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
     carrinho.push({nome, preco, tamanho, idproduto});

     localStorage.setItem("carrinho", JSON.stringify(carrinho));
     
     atualizarCarrinho();
}


function atualizarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const lista = document.getElementById("carrinho-lista");
    let total = 0;
    let itenstotal = 0;

     lista.innerHTML = "";

     carrinho.forEach((item, index) => {
        total += item.preco;
        itenstotal++;
          lista.innerHTML += `<li>
              <div class="prod_Offcanva">
                   <img src="../Produtos_img/${item.idproduto}/0.jpg" alt=""> <strong><h5>${item.nome}</h5> Tamanho: ${item.tamanho} <br> R$ ${item.preco} </strong>
                          <button onclick="removerItem(${index})">Remover</button>
              </div>
          </a></li>`;
        
     });

     document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
     document.getElementById("itens-on-cart").innerHTML = `${carrinho.length}`;
     
     //adiciona botão limpar carrinho
     if (itenstotal !== 0) {
        document.getElementById('Btn-limpar').innerHTML = `<button onclick="limparCarrinho()" class="limparCarrinho">Limpar carrinho</button>`;
        document.getElementById('Btn-comprar').innerHTML = `<a href=""><button>Finalizar compra</button></a>`;
    };
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (index >= 0 && index < carrinho.length) {
        carrinho.splice(index, 1); // Remove o item do array
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarCarrinho();
        itenstotal = carrinho.length;
     if (itenstotal === 0) {
        document.getElementById('Btn-limpar').innerHTML = '';
        document.getElementById('Btn-comprar').innerHTML = '';
}}

}

function limparCarrinho() {
    localStorage.removeItem("carrinho");

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
