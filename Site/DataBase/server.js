const express = require('express');
const conexao = require('./DataBase.js');
const app = express();
const cors = require('cors');


// Habilita o cors que permite o site acesse a api
app.use(cors({ origin: '*' }));

//Habilita o uso de json
app.use(express.json());

//Rota para buscar os produtos no banco de dados
app.get('/produtos', (req, res) => {
    conexao.query('SELECT * FROM camisas LIMIT 6', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }else{
            res.json(results);
        }
    });
});

app.get('/produto', (req, res) => {
    let id = req.query.id;
    let sql = `SELECT * FROM camisas WHERE idproduto = ?`;

    conexao.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar produto' });
        } else {
            res.json(result[0]); // Retorna apenas o primeiro item
        }
    });
});

app.get('/relacionados', (req, res) => {
    let id = req.query.id;
    let sql = `SELECT * FROM camisas ORDER BY RAND() LIMIT 6`;

    conexao.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao buscar produtos relacionados' });
        } else {
            res.json(result);
        }
    });
});

app.post('/fazer-pedido', (req,res) =>{
    const { cliente, email, produtos, total} = req.body;

    if (!cliente || !email || !produtos || !total) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    const sql = "INSERT INTO pedidos (cliente,email,produtos,total) VALUES (?,?,?,?)";
    db.query(sql, [cliente,email,JSON.stringify(produtos),total], (err,result) => {
         if (err) return res.status(500).send("Erro ao salvar o pedido.");
        res.send({ message: "Pedido realizado!", pedidoId: result.insertId });
    });
});

app.get('/pedidos', (req, res)=>{
    db.query("SELECT * FROM pedidos ORDER BY data-pedido DESC", (err,results)=>{
        if(err) return res.status(500).send("erro ao buscar pedidos.");
        res.json(results);
    });
});

//Estabelece a porta e o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});