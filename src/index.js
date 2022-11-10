const express = require('express');
const server = express();
server.use(express.json()); // convertendo de json para objeto tudo que vier de arquivo

const playlists = [ // vetor de objetos, cada um uma playlist, a qual tera uma propriedade vetor de musicas
    {
        id: 1,
        nome: 'Rock Classics',
        capa: '/img/beatlessmaller.webp',
        musicas: [
            {
                id: 1,
                nome: 'Sweet Child O Mine',
                arquivo: '/tracks/GunsNRoses-SweetChildOMine.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'Bohemian Rhapsody',
                arquivo: '/tracks/Queen-BohemianRhapsody.mp3' // pegar um arquivo de audio
            }
        ]
    },
    {
        id: 2,
        nome: 'Top Hits',
        capa: '/img/tophits.jpg',
        musicas: [
            {
                id: 1,
                nome: 'Let it be',
                arquivo: '/tracks/LetItBe.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'Dont Let Me Down',
                arquivo: '/tracks/TheBeatles-DontLetMeDown.mp3' // pegar um arquivo de audio
            }
        ]
        
    },
    {
        id: 3,
        nome: 'Jazz',
        capa: '/img/armstrong.jpg',
        musicas: [
            {
                id: 1,
                nome: 'John Coltrane - In A Sentimental Mood',
                arquivo: '/tracks/JohnColtrane-InASentimentalMood.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'I Fall In Love Too Easily',
                arquivo: '/tracks/IFallInLoveTooEasily.mp3' // pegar um arquivo de audio
            }
        ]
    },
    {
        id: 4,
        nome: 'O Melhor da Bossa Nova',
        capa: '/img/bossanova.png',
        musicas: [
            {
                id: 1,
                nome: 'Garota De Ipanema',
                arquivo: '/tracks/GarotaDeIpanema.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'Chega De Saudade',
                arquivo: '/tracks/ChegaDeSaudade.mp3' // pegar um arquivo de audio
            }
        ]
    },
    {
        id: 5,
        nome: 'Lofi',
        capa: '/img/rsz_1lofi.png',
        musicas: [
            {
                id: 1,
                nome: 'Lindecis - Soulful',
                arquivo: '/tracks/Lindecis-Soulful.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'RUDE - Eternal Youth',
                arquivo: '/tracks/RUDE-EternalYouth.mp3' // pegar um arquivo de audio
            }
        ]
    },
    {
        id: 6,
        nome: 'MPB',
        capa: '/img/timmaia.jpg',
        musicas: [
            {
                id: 1,
                nome: 'Ela Partiu',
                arquivo: '/tracks/TimMaia-ElaPartiu.mp3' // pegar um arquivo de audio
            },
            {
                id: 2,
                nome: 'Alucinacao',
                arquivo: '/tracks/Alucinação-ApenasumRapazLatinoAmericano.mp3' // pegar um arquivo de audio
            }
        ]
    }
]

const musicas = [
    {
      id: 1,
      nome: "Sweet Child O Mine",
      arquivo: "/tracks/GunsNRoses-SweetChildOMine.mp3"
    },
    {
      id: 2,
      nome: "Bohemian Rhapsody",
      arquivo: "/tracks/Queen-BohemianRhapsody.mp3"
    },
    {
      id: 3,
      nome: "Let it be",
      arquivo: "/tracks/LetItBe.mp3"
    },
    {
      id: 4,
      nome: "Dont Let Me Down",
      arquivo: "/tracks/TheBeatles-DontLetMeDown.mp3"
    },
    {
      id: 5,
      nome: "John Coltrane - In A Sentimental Mood",
      arquivo: "/tracks/JohnColtrane-InASentimentalMood.mp3"
    },
    {
      id: 6,
      nome: "I Fall In Love Too Easily",
      arquivo: "/tracks/IFallInLoveTooEasily.mp3"
    },
    {
      id: 7,
      nome: "Garota De Ipanema",
      arquivo: "/tracks/GarotaDeIpanema.mp3"
    },
    {
      id: 8,
      nome: "Chega De Saudade",
      arquivo: "/tracks/ChegaDeSaudade.mp3"
    },
    {
      id: 9,
      nome: "Lindecis - Soulful",
      arquivo: "/tracks/Lindecis-Soulful.mp3"
    },
    {
      id: 10,
      nome: "RUDE - Eternal Youth",
      arquivo: "/tracks/RUDE-EternalYouth.mp3"
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
server.get('/musicas', (req, res) => {
    res.json(musicas)
})

// PUTS EDITAR MUSICA


server.listen(3010);