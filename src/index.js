const express = require('express');
const server = express();
server.use(express.json()); // convertendo de json para objeto tudo que vier de arquivo

const playlists = [
    {
        id: 1,
        nome: 'Rock',
        capa: 'rock.png'
    },
    {
        id: 2,
        nome: 'House',
        capa: 'house.png'
    },
    {
        id: 3,
        nome: 'Pop',
        capa: 'Pop.png'
    }
]

// PLAYLIST
// GET PLAYLIST
server.get('/playlists', (req, res) => {
    res.json(playlists) // retornar em arquivo json
})

// GET PLAYLISTDETAIL
server.get('/playlists/id', (req, res) => {
    const { id } = req.params;

    res.json(playlists) // retornar em arquivo json
})


// POST CADASTRAR PLAYLIST
server.post('/playlists/id', (req, res) => {
    const { id } = req.params;

    const { xyz } = req.params;
    const { email } = req.query; // desestrutura o email passado

    const playlist = req.body; // objeto contendo varias outras coisas, json, 
    playlists.push(playlist) /// inserir uma nova playlist no vetor
    res.json();
});

// GET BUSCAR MUSICA

// PUTS EDITAR MUSICA


server.listen(3001);