// entidade pra fornecer metodos pra salver, ler e atualizar dados
const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    approved: Boolean
})

module.exports = Person;