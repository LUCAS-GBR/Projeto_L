fetch(`http://localhost:3000/fazer-pedido`)

const form = document.getElementById('pedidoForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pedido = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,

        produtos: [
            {
                id: document.getElementById('id').value,
                nome: document.getElementById('nome-produto').value,
                preco: document.getElementById('preco').value,
                quantidade: document.getElementById('quantidade').value
            }
        ]
    };