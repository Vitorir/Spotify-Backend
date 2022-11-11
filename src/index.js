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


  const users = [
    {
        email: "a@a.com",
        senha: "123",
        id: 1
    },
    {
        email: "lucascm00@gmail.com",
        senha: "176400",
        id: 2
    },
    {
        email: "vitor@gmail.com",
        senha: "12300",
        id: 3
    }
]


// PLAYLIST
// GET PLAYLIST
server.get('/playlists', (req, res) => {
    res.json(playlists) // retornar em arquivo json
})

// GET PLAYLISTDETAIL
server.get('/playlists/:id', (req, res) => {
    const { id } = req.params;

    res.json(playlists[id - 1]) // retornar em arquivo json
})


// POST CADASTRAR PLAYLIST
server.post('/playlists/', (req, res) => {
    const playlist = req.body; // playlist passada pelo postman
    playlists.push(playlist) /// inserir uma nova playlist no vetor
    res.json(playlist);
});

// GET BUSCAR MUSICA
server.get('/musicas', (req, res) => {
    const { nome }= req.query;

    if (nome) {
        const musica = musicas.filter((m) => m.includes(nome));
        return res.json(musica);
    }
    return res.json(musicas);
});

// PUTS EDITAR PLAYLIST
server.put('/playlists/:id', (req, res) => {
    const { id } = req.params; 

    const playlist  = req.body;
    playlists[id - 1] = playlist; 
    res.json(playlists);
});



// GET usuario especifico
server.get('/users', (req, res) => {
    const { email } = req.query;

    if (email) {
        const usuario = users.filter((u) => u.email == email);
    
        return res.json(usuario[0]);
    }

    return res.json(users);
});


//POST USUARIOS
server.post('/users', (req, res) => {
    const user = req.body
    users.push(user);
    res.json(user);
});

//PuT usuarios
server.put('/users/:id', (req, res) => {
    const { id } = req.params; 
    const user = req.body;
    users[id - 1] = user; 
     res.json(users);
});



server.listen(3001);