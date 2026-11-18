import conexao from "../config/conexao.js";
const CategoriaSchema = new conexao.Schema({
  nome: { type: String,required: true},
  tipo: {type: String,required: true},
  descricao: { type: String,required: true}
});
const Categoria = 
conexao.model("Categoria", CategoriaSchema);
export default Categoria;