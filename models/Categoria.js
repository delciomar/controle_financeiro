import conexao from "../config/conexao.js";
const CategoriaSchema = new conexao.Schema({
  tipo: {type: String,required: true}
});
const Categoria = 
conexao.model("Categoria", CategoriaSchema);
export default Categoria;