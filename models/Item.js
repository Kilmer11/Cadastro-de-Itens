const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
    
    nomeItem: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    subCategoria: {
        type: String,
        required: true
    },
    medida: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    }
})

mongoose.model("itens", Item);