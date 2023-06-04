const express = require("express");
const body = require("body-parser");
const app = express();
app.use(body.json())

const mid = function (req, res) { res.send("Alo mamae"); }

const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João" },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans" },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé" },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps" },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé" },
    ]
}

app.post("/produtos", function (req, res) {
    lista_produtos.produtos.push(req.body)
    console.log(req.body)
    res.send("Produto adicionado");
});


app.get("/produtos", function (req, res) {
    res.send(lista_produtos.produtos);
});


app.get("/produtos/:id", function (req, res) {
    const id = req.params.id;
    const produto = lista_produtos.produtos.find(p => p.id === Number(id));
    if (produto) {
        res.send(produto);
    } else {
        res.status(404).send("Produto não encontrado");
    }
});

app.put("/produtos/:id", function (req, res) {
    const id = req.params.id;
    const novoProduto = req.body
    const index = lista_produtos.produtos.findIndex((prod) => prod.id == id)
    lista_produtos.produtos[index] = novoProduto
    res.send("Produto alterado com sucesso");
});

app.delete("/produtos/:id", function (req, res) {
    const id = req.params.id;
    const novoProduto = req.body
    const index = lista_produtos.produtos.findIndex((prod) => prod.id == id)
    lista_produtos.produtos.splice(index, 1)
    res.send("Produto excluído com sucesso");
});

app.listen(3000, "0.0.0.0", function () {
    console.log("Servidor rodando na porta 3000");
});

