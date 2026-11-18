import conexao from "../config/conexao.js";
const UsuarioSchema = new conexao.Schema({
  nome:{type: String, required:false},
  senha:{type:String, required:false},
  biografia:{type:String, required:false},
  foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         }
    }
})


const Usuario = 
conexao.model("Usuario", UsuarioSchema);
export default Usuario;