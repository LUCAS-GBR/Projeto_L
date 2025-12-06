const mysql = require('mysql2');


const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'produtos'
});

conexao.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao mySQL:', err);
        return;
    }
    console.log('Conectado ao mySQL');
});

module.exports = conexao;