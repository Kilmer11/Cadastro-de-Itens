const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria")
const Categoria = mongoose.model("categorias");
require("../models/Item");
const Itens = mongoose.model("itens");
  

    router.get("/categorias", (req, res) => {

        Categoria.find().lean().then((categorias) => {
            res.render("cadastro/categorias", {categorias: categorias})
        }).catch((err) => {
            console.log("Houve um erro: "+err);
            res.redirect("cadastro/categorias")
        })
    })

    router.get("/categorias/itens/:id", (req, res) => {
        Categoria.findOne({_id: req.params.id}).lean().then((categoria) => {
            if(categoria) {
                Itens.find({categoria: categoria._id}).lean().then((itens) => {
                    res.render("cadastro/itens", {itens: itens, categoria: categoria})
                }).catch((err) => {

                })
            }else {
                res.redirect("/cadastro/categorias")
            }
        }).catch((err) => {
            console.log(err)
            res.redirect("/cadastro/categorias")
        })
    })

    router.get("/categorias/add", (req, res) => {
        res.render("cadastro/addcategorias")
    })

    router.post("/categorias/nova", (req, res) => {

        var erros = [];

        if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null || req.body.nome.length < 3) {
            erros.push({text: "categoria inválida!!"})
        }

        if(erros.length > 0) {
            res.render("cadastro/addCategorias", {erros: erros})
        }

        else{
            const novaCategoria = {
                nome: req.body.nome
            }
    
            new Categoria(novaCategoria).save().then(() => {
                console.log("salvo com sucesso")
            }).catch((err) => {
                console.log("ERRo"+err)
            })
        }
        })

        router.post("/categorias/deletar", (req, res) => {
            Categoria.deleteOne({_id: req.body.id}).then(() => {
                res.redirect("/cadastro/categorias")
            }).catch((err) => {
                
            })
        })

     router.get("/itens", (req, res) => {
        Itens.find().populate("categoria").sort({data:"desc"}).lean().then((itens) => {
            res.render("cadastro/listaItem", {itens: itens});
        }).catch((err) => {
            console.log(err)
            res.redirect("/cadastro/itens");
        })
    })

    router.get("/itens/add", (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render("cadastro/addItens", {categorias: categorias});
        }).catch((err) => {
            res.redirect("/cadastro/categorias")
        })
    })

    router.post("/itens/nova", (req, res) => {
        
        var erros = [];

        if(!req.body.nomeitem || typeof req.body.nomeitem == undefined || req.body.nomeitem == null) {
            erros.push({text: "Nome inválido"})
        }

        if(!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null) {
            erros.push({text: "Marca inválida"})
        }

        if(req.body.marca.length < 3) {
            erros.push({text: "Nome da marca muito pequeno"})
        }

        if(!req.body.subcategoria || typeof req.body.subcategoria == undefined || req.body.subcategoria == null) {
            erros.push({text: "Subcategoria inválida"})
        }

        if(!req.body.medida || typeof req.body.medida == undefined || req.body.medida == null) {
            erros.push({text: "Unidade de medida inválida"})
        }

        if(!req.body.categorias || typeof req.body.categorias == undefined || req.body.categorias == null) {
            erros.push({text: "Categoria inválida"})
        }

        if(req.body.quantidade == null) {
            erros.push({text: "Quantidade inválida"})
        }

        if(erros.length > 0) {
            res.render("cadastro/addItens", {erros: erros})
        }
        
        else {
            const novoItem = {
                nomeItem: req.body.nomeitem,
                marca: req.body.marca,
                subCategoria: req.body.subcategoria,
                quantidade: req.body.quantidade,
                medida: req.body.medida,
                categoria: req.body.categorias
            }
    
            new Itens(novoItem).save().then(() => {
                res.redirect("/cadastro/itens")
            }).catch((err) => {
                console.log(err)
                res.redirect("/cadastro/itens")
            })
        }    
    })

    router.post("/itens/deletar", (req, res) => {
        Itens.deleteOne({_id: req.body.id}).then(() => {
            res.redirect("/cadastro/categorias/itens")
        }).catch((err) => {
            
        })
    })

    router.get("/itens/saida/:id", (req, res) => {
        Itens.findOne({_id: req.params.id}).lean().then((item) => {
            res.render("cadastro/editItens", {item: item});
        }).catch((err) => {
            console.log("ERRO: "+err)
        })
    })

    router.post("/itens/saida", (req, res) => {

            var erros = [];

            if(req.body.quantidade <= 0) {
                erros.push({text: "Quantidade inválida"})
            }

            else {
                Itens.findOne({_id: req.body.id}).then((item) => {

                item.quantidade = req.body.quantidade

                item.save().then(() => {
                    res.redirect("/cadastro/itens")
                }).catch((err) => {
                    res.redirect("/cadastro/itens")
                })

            }).catch(() => {
                res.redirect("/cadastro/itens")
            })
            }      
    })
 
module.exports = router;