            //Carrossel

document.addEventListener( 'DOMContentLoaded', function () {
    var mainCarousel = new Splide( '#main-carousel', {
        type  :     'loop',
        arrows:     false,
        pagination: false,
    })
    var thumbnailCarousel = new Splide('#thumbnail-carousel', {
        fixedWidth  : 100,  // Largura fixa das miniaturas
        fixedHeight : 100,   // Altura fixa das miniaturas
        isNavigation: true, // Define como navegação do carrossel principal
        gap         : 10,   // Espaçamento entre miniaturas
        pagination  : false,
        cover       : true,
        arrows      : false,
    });

    mainCarousel.sync(thumbnailCarousel); // Sincroniza os dois carrosséis
    mainCarousel.mount();
    thumbnailCarousel.mount();
});
    
            //pega o id do produto da url

const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get("id");

fetch(`http://localhost:3000/produto?id=${produtoId}`)
    .then(response => response.json())
    .then(produto => {
        document.getElementById("nome").textContent = `${produto.nome} ${produto.temporada}`;
        document.getElementById("precoProd").textContent = `R$ ${produto.preco}`;

        document.getElementById("botaoDeCompra").innerHTML = `
    <button onclick="addcart('${produto.nome}',${produto.preco}, document.getElementById('tamanho').value,${produtoId})" class="prodAddCart"           type="button" data-bs-toggle="offcanvas"
        data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg"
        aria-label="Toggle navigation">Adicionar ao carrinho</button>
`;
    })
            //imagem do produto dinamicas

document.getElementById("slide_prod").innerHTML = `
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/1.jpg" alt="">
        </li>
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/2.jpg" alt="">
        </li>
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/3.jpg" alt="">
        </li>
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/4.jpg" alt="">
        </li>
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/5.jpg" alt="">
        </li>
        <li class="splide__slide">
            <img src="../produtos_img/${produtoId}/6.jpg" alt="">
        </li>
`;
        //thumbnail do produto dinamicas
document.getElementById("thumb-prod").innerHTML = `
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/1.jpg" alt="Thumb 1"></li>
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/2.jpg" alt="Thumb 2"></li>
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/3.jpg" alt="Thumb 3"></li>
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/4.jpg" alt="Thumb 4"></li>
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/5.jpg" alt="Thumb 4"></li>
        <li class="splide__slide"><img src="../Produtos_img/${produtoId}/6.jpg" alt="Thumb 4"></li>    
        `;

fetch(`http://localhost:3000/relacionados`)
.then(response => response.json())
.then(data => {
    let relacionados = '';
    data.forEach(produto => {
        relacionados +=`
                        <li class="splide__slide p-3 prodRelacionados">
                            <a href="../produtos/produto.html?id=${produto.idproduto}">
                                <div><img src="../Produtos_img/${produto.idproduto}/0.jpg" alt=""></div>
                                <strong><p>${produto.nome} <br> ${produto.temporada}</p></strong>
                                <strong><p>R$${produto.preco}</p></strong>
                                <button>Comprar</button>
                            </a>
                        </li>
                    `
        
    })
    document.getElementById('relacionados').innerHTML = relacionados;
});


document.addEventListener( 'DOMContentLoaded', function (){
    new Splide ( '#carousel-relac', {
        type: true,
}).mount();
});