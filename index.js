const express = require('express');
const app = express();
const port = 3000;
const db = require("./db");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//Seleccionar todos los usuarios (Read)
app.get("/", (req, res) => {
    sql = "SELECT * FROM usuarios";
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.render("index", { usuarios: results });
    });
});

//Eliminar un usuario de la base de datos (Delete)
app.get("/eliminar/:id", (req, res) => {
    const id = req.params.id;
    sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql, id, (error, results) => {
        if (error) throw error;
        res.redirect("/");
    });
});

//Mostrar formulario para agregar un usuario (Pre_Create)
app.get("/agregar", (req, res) => {
    res.render("agregar");
});


//Agregar un usuario a la base de datos (Create)
app.post("/agregar", (req, res) => {
    const { nombre, email } = req.body;
    sql = "INSERT INTO usuarios SET ?";
    db.query(sql, { nombre, email }, (error, results) => {
        if (error) throw error;
        res.redirect("/");
    });
});

//Mostrar formulario para editar un usuario (Pre_Update)
app.get("/editar/:id", (req, res) => {
    const id = req.params.id;
    sql = "SELECT * FROM usuarios WHERE id = ?";
    db.query(sql, id, (error, results) => {
        if (error) throw error;
        res.render("editar", { usuario: results[0] });
    });
});

//Editar los datos de un usuario (Update)
app.post("/editar/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?";
    db.query(sql, [nombre, email, id], (error, results) => {
        if (error) throw error;
        res.redirect("/");
    });
});

app.listen(port,()=>{
    console.log(`App running on http://localhost:${port}`)
});