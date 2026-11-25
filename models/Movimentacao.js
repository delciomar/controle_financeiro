import conexao from "../config/conexao.js";
const MovimentacaoSchema = new conexao.Schema({
  nome:{type:String,required:false},
  descricao:{type:String,required:false},
  valor:{type:Number,required:false},
  data: {type: Date,required: true},
  tipo:{type:String, required:false},
  categoria_id: {
    type: conexao.Schema.Types.ObjectId,
    ref: "Categoria",
    required: true
  }


});
const Movimentacao = 
conexao.model("Movimentacao", MovimentacaoSchema);
export default Movimentacao;