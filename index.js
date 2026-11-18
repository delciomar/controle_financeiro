import express from 'express'
const app = express();
const PORT = 3000;

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + '/public'))


import Usuario from './models/Usuario.js'
import Movimentacao from './models/Movimentacao.js'
import Categoria from './models/Categoria.js'

app.get('/', (req, res) => {
    //envio de informação para o EJS
    res.render("index");
})

app.get('/usuario/add', (req, res) => {
    res.render("usuario/add");
})

app.get('/usuario', async (req, res) => {
    const usuarios = await Usuario.find()
    res.render("usuario/lst", {usuarios});
})

app.post('/usuario/add', upload.single('foto'), async (req, res) => {
  const {nome,biografia,senha} = req.body
  let foto = null
  if(req.file) foto = req.file.buffer
  await Usuario.create({nome,biografia,senha,foto})
  res.render("usuario/add");
})

app.get('/usuario/del/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id)
    const usuarios = await Usuario.find()
    res.render("usuario/lst", {usuarios});
})

app.get('/usuario/upd/:id', async  (req, res) => {
  //busca o registro que quero alterar
  const usuario = await Usuario.findById(req.params.id)
  res.render("usuario/upd", {usuario});
})

app.post('/usuario/upd/:id',  async (req, res) => {
  const {nome,biografia,senha} = req.body
  await Usuario.findByIdAndUpdate(req.params.id, {nome,biografia,senha})
   const usuarios = await Usuario.find()
  res.render("usuario/lst", {usuarios});
})

//rota para pesquisar instrumento por nome
app.post('/usuario', async (req, res) => {
  const { pesquisar } = req.body;
  const usuarios = await Usuario.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("usuario/lst", { usuarios });
})
 
// USUARIO em cima

//

app.get('/categoria',  async (req, res) => {
 //listar espécies
 const categorias = await Categoria.find()
 res.render("categoria/lst", {categorias});

})

app.get('/categoria/add',  (req, res) => {
  res.render("categoria/add");
})
//Rota POST pra gravar no Banco de Dados
app.post('/categoria/add',  async (req, res) => {
  const {nome,tipo,descricao} = req.body
  await Categoria.create({nome,tipo,descricao})
  res.render("categoria/add");
})

app.get('/categoria/del/:id',  async (req, res) => {
await Categoria.findByIdAndDelete(req.params.id)
  //listar espécies
 const categorias = await Categoria.find()
 res.render("categoria/lst", {categorias});
})

app.get('/categoria/upd/:id', async  (req, res) => {
  //busca o registro que quero alterar
  const categoria = await Categoria.findById(req.params.id)
  res.render("categoria/upd", {categoria});
})

app.post('/categoria/upd/:id',  async (req, res) => {
  const {nome,tipo,descricao} = req.body
  await Categoria.findByIdAndUpdate(req.params.id, {nome,tipo,descricao})
   const categorias = await Categoria.find()
  res.render("categoria/lst", {categorias});
})

// especie em cima 

//

app.get('/movimentacao/add', (req, res) => {
    res.render("movimentacao/add");
})

app.get('/movimentacao', async (req, res) => {
    const movimentacoes = await Movimentacao.find()
    res.render("movimentacao/lst", {movimentacoes});
})

app.post('/movimentacao/add',  async (req, res) => {
  const {nome,descricao,valor,data,tipo} = req.body
  await Movimentacao.create({nome,descricao,valor,data,tipo})
  res.render("movimentacao/add");
})

app.get('/movimentacao/del/:id', async (req, res) => {
  await Movimentacao.findByIdAndDelete(req.params.id)
  const movimentacoes = await Movimentacao.find()
  res.render("movimentacao/lst", {movimentacoes});
})

app.get('/movimentacao/upd/:id', async  (req, res) => {
  //busca o registro que quero alterar
  const movimentacao = await Movimentacao.findById(req.params.id)
  res.render("movimentacao/upd", {movimentacao});
})

app.post('/movimentacao/upd/:id',  async (req, res) => {
  const {nome,descricao,valor,data,tipo} = req.body
  await Movimentacao.findByIdAndUpdate(req.params.id, {nome,descricao,valor,data,tipo})
   const movimentacoes = await Movimentacao.find()
  res.render("movimentacao/lst", {movimentacoes});
})


app.listen(PORT, () => {
    console.log(`servidor rodando em http://localhost:${PORT}`);
});
