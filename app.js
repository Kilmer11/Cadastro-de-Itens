const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cadastro = require("./routes/cadastro");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();
require("dotenv").config();

//Configurações
    //body-parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.DATABASE_URL).then(() => {
                console.log("Conectado!!")
            }).catch((err) => {
                console.log("ERRO! "+err)
            })
    //public
        app.use(express.static(path.join(__dirname, "public")));

        app.use((req, res, next) => {
            console.log("Middleware");
            next();
        })

//Rotas
    app.use('/cadastro', cadastro);

const PORT = 4020;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta "+PORT);
})