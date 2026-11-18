import dns from 'dns';

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

import mongoose from "mongoose";
const url = "mongodb+srv://darosadelciomar_db_user:aluno@cluster0.qf0dpj8.mongodb.net/"


const conexao = await mongoose.connect(url)

export default conexao

