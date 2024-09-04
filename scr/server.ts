const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log('Server running at http://localhost:$(port)/');
})

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

//Requests de Tag primária
app.get('/tags_primarias', (req, res) => {
    res.send('Tabela com todas as tags priamárias');
});

app.post('/tags_primarias', (req, res) => {
    res.send('Cria uma nova tag primária');
});

app.delete('/tags_primarias/:tag_primaria', (req, res) => {
    res.send('Deleta uma tag primária');
});

//Requests de Tag secundária
app.get('/tags_secundarias/:tag_primaria', (req, res) => {
    res.send('Tabela com todas as tags secundárias de uma tag priamária específica');
});

app.post('/tags_secundarias/:tag_primaria', (req, res) => {
    res.send('Cria uma nova tag secundária associada a uma tag primária');
});

app.delete('/tags_secundarias/:tag_secundaria', (req, res) => {
    res.send('Deleta uma tag secundária');
});

//Requests de Estabelecimento
app.get('/estabelecimentos', (req, res) => {
    res.send('Tabela com todos os estabelecimentos da cidade selecionada que possui todas as tagas marcadas');
});

app.get('/estabelecimentos/:estabelecimento', (req, res) => {
    res.send('Informações sobre um estabelecimento específico');
});

app.post('/estabelecimentos', (req, res) => {
    res.send('Cria um novo estabelecimento');
});

app.put('/estabelecimentos/:estabelecimento', (req, res) => {
    res.send('Associa uma tag primária a um estabelecimento que ainda não possui uma');
});

app.put('/estabelecimentos/:estabelecimento', (req, res) => {
    res.send('Associa uma lista de tags secundárias a um estabelecimento');
});

app.put('/estabelecimentos/:estabelecimento', (req, res) => {
    res.send('Atualiza as informações do estabelecimento');
});

app.delete('/estabelecimentos/:estabelecimento', (req, res) => {
    res.send('Deleta um estabelecimento');
});

//Requests de Usuário
app.get('/usuarios/:usuario', (req, res) => {
    res.send('Retorna um usuário');
});

app.post('/usuarios', (req, res) => {
    res.send('Cria um novo usuário');
});

app.put('/usuarios/:usuario', (req, res) => {
    res.send('Atualiza informações do usuário');
});

app.put('/usuarios/:usuario', (req, res) => {
    res.send('Atualiza a lista de estabelecimentos salvos do usuário');
});

app.delete('/usuarios/:usuario', (req, res) => {
    res.send('Deleta um usuário');
});