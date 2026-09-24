const express = require('express');
const conexao = require('./DataBase.js');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/produtos', (req, res) => {
    conexao.query('SELECT * FROM camisas LIMIT 6', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        } else {
            res.json(results);
        }
    });
});

app.get('/produto', (req, res) => {
    const id = req.query.id;

    const sql = 'SELECT * FROM camisas WHERE idproduto = ?';

    conexao.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        } else {
            res.json(result[0]);
        }
    });
});

app.get('/relacionados', (req, res) => {
    const id = req.query.id;

    const sql = `
        SELECT * FROM camisas
        WHERE idproduto <> ?
        ORDER BY RAND()
        LIMIT 6
    `;

    conexao.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                error: 'Erro ao buscar produtos relacionados'
            });
        } else {
            res.json(result);
        }
    });
});

app.post('/fazer-pedido', (req, res) => {
    const { cliente, email, produtos, total } = req.body;

    if (!cliente || !email || !produtos || !total) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }

    const sql = `
        INSERT INTO pedidos (cliente, email, produtos, total)
        VALUES (?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [cliente, email, JSON.stringify(produtos), total],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro ao salvar o pedido.');
            }

            res.send({
                message: 'Pedido realizado!',
                pedidoId: result.insertId
            });
        }
    );
});

app.get('/pedidos', (req, res) => {
    const sql = `
        SELECT * FROM pedidos
        ORDER BY \`data-pedido\` DESC
    `;

    conexao.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar pedidos.');
        }

        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});