const express = require('express');
const {ObjectId} = require('mongodb');
const server = express();

server.use(express.json()); // convertendo de json para objeto tudo que vier de arquivo

const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const { request } = require('express');
const { defaultAuthProviders } = require('mongodb/lib/core');
const mongoClient  = require('mongodb').MongoClient;

const MONGO_HOST = 'mongodb+srv://vitorir:BnEXyVQlKWet1VYV@cluster0.lvgrq.mongodb.net/bancoAPI?retryWrites=true&w=majority';
const MONGO_DB = 'Spotify';
const MONGO_COLLECTION_playlists = 'playlists';
const MONGO_COLLECTION_users = 'users';
const MONGO_COLLECTION_musicas = 'musicas';

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
                arquivo: '/tracks/Alucina????o-ApenasumRapazLatinoAmericano.mp3' // pegar um arquivo de audio
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


server.post('/person', async(req, res, next) => {
    // req body
    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved
    }

    if(!name) {
        res.status(422).json({error: 'O nome e obrigatorio'})
    }

    try {
        await Person.create() // esperando salvar o dado
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' }) // enviar status pro postman
        
    } catch (error) {
        res.status(500).json({ error: error }) // se der erro, atribuir um erro de servidor 
    }
})


// PLAYLIST
// GET PLAYLIST FUNCIONA
server.get('/playlists', (req, res) => {
    mongoClient.connect(MONGO_HOST, (err, client) => {
       if (err) throw err
       // const database = client.get('Spotify');
       const database = client.db(MONGO_DB);
       database.collection(MONGO_COLLECTION_playlists).find().toArray((err, result) => {
        if (err) throw err
        res.send(result)
       })
    });

    //res.json(playlists) // retornar em arquivo json
});

// GET PLAYLISTDETAIL FUNCIONA
server.get('/playlists/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db(MONGO_DB);
        database.collection(MONGO_COLLECTION_playlists).findOne({_id: ObjectId(id)}, (err, result) => {
         if (err) throw err
         res.send(result)
        })
     });

    //res.json(playlists[id - 1]) // retornar em arquivo json
});


// POST CADASTRAR PLAYLIST FUNCIONA
server.post('/playlists/', (req, res) => {
    const playlist = req.body; // playlist passada pelo postman

    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db("Spotify");
        database.collection(MONGO_COLLECTION_playlists).insertOne(req.body, (err) => {
            if (err) throw err
            res.json(playlist)
        });
    })
    playlists.push(playlist) /// inserir uma nova playlist no vetor
    //res.json(playlist);
});

// POST MUSICA
server.post('/musicas/', (req, res) => {
    const musica = req.body; // playlist passada pelo postman    

    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db("Spotify");
        database.collection(MONGO_COLLECTION_musicas).insertOne(req.body, (err) => {
            if (err) throw err
            res.json(musica)
        });
    });
    musicas.push(musica) /// inserir uma nova musica no vetor
});

// GET BUSCAR MUSICA
server.get('/musicas', (req, res) => {
    const { nome }= req.query;

    if (nome) {
        mongoClient.connect(MONGO_HOST, (err, client) => {
            if (err) throw err
            const database = client.db(MONGO_DB);
            database.collection(MONGO_COLLECTION_musicas).find({nome: nome}).toArray((err, result) => {
             if (err) throw err
             res.send(result)
            })
         });
        //const musica = musicas.filter((m) => m.includes(nome));
        //return res.json(musica);
    }
    
    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db(MONGO_DB);
        database.collection(MONGO_COLLECTION_musicas).find().toArray((err, result) => {
         if (err) throw err
         res.send(result)
        })
     });
});

// PUTS EDITAR PLAYLIST
server.post('/playlists/:id/musicas/:idMusic', (req, res) => {
    const { id, idMusic } = req.params; 

    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db(MONGO_DB);
        database.collection(MONGO_COLLECTION_musicas).findOne({ _id: ObjectId(idMusic) }, (err, result) => {
          if (err) throw err
          const music = result;

          database.collection(MONGO_COLLECTION_playlists).updateOne({ _id: ObjectId(id) }, {$push: {musicas: music}}, (err, result) => {
            if (err) throw err
            res.send();
          });
        });
      });
});

server.delete('/playlists/:id/musicas/:idMusic', (req, res) => {
    const { id, idMusic } = req.params; 

    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db(MONGO_DB);
          database.collection(MONGO_COLLECTION_playlists).updateOne({ _id: ObjectId(id) }, {$pull: {musicas: {_id: ObjectId(idMusic)}}}, (err, result) => {
            if (err) throw err
            res.send();
          });
        });
});




// GET usuario especifico
server.get('/users', (req, res) => {
    const { email } = req.query;


    if (email) {
        mongoClient.connect(MONGO_HOST, (err, client) => {
            if (err) throw err
            const database = client.db(MONGO_DB);
            database.collection(MONGO_COLLECTION_users).find({email: email}).toArray((err, result) => {
             if (err) throw err
             res.send(result)
            })
         });
    }else{
        mongoClient.connect(MONGO_HOST, (err, client) => {
            if (err) throw err
            const database = client.db(MONGO_DB);
            database.collection(MONGO_COLLECTION_users).find().toArray((err, result) => {
             if (err) throw err
             res.send(result)
            })
         });
    }

    
   
});


//POST USUARIOS
server.post('/users', (req, res) => {
    const user = req.body;
    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db("Spotify");
        database.collection(MONGO_COLLECTION_users).insertOne(req.body, (err) => {
            if (err) throw err
            res.json(user)

        });
    })
});

//Put usuarios
server.put('/users/:id', (req, res) => {

    const {id}  = req.params;
    const {email, senha} = req.body;
    //playlists[id - 1] = playlist; 

    mongoClient.connect(MONGO_HOST, (err, client) => {
        if (err) throw err
        const database = client.db(MONGO_DB);
        database.collection(MONGO_COLLECTION_users).updateOne({ _id: ObjectId(id) }, { $set: {email, senha} }, (err) => {
          if (err) throw err
          res.send();
        });
      });

   
});

// estabelecer conexao com bd antes de iniciar aplicacao
mongoose.connect('mongodb+srv://vitorir:BnEXyVQlKWet1VYV@cluster0.lvgrq.mongodb.net/bancoAPI?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectado ao MONGODB!')
    server.listen(3001);
})
.catch((err) => console.log(err));


server.listen(3005);