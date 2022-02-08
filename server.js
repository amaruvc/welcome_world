const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.static("static"));

//Rutas
app.get("/crear", (req, res) => {
  const archivo = req.query.archivo;
  const contenido = req.query.contenido;
  fs.writeFile(`archivos/${archivo}`, contenido, "utf8", (err) => {
    if (err) {
      res.send("No se pudo crear el archivo");
    } else {
      console.log("archivo creado ok");
    }
  });
  res.send("Creando el archivo");
});

//Rutas
app.get("/leer", (req, res) => {
  const archivo = req.query.archivo;
  fs.readFile(`archivos/${archivo}`, "utf8", (err, data) => {
    if (err) {
      res.send("Archivo no encontrado");
    } else {
      res.send(data);
      console.log("Archivo leído");
    }
  });
});

//Rutas
app.get("/renombrar", (req, res) => {
  const nombre = req.query.nombre;
  const nuevoNombre = req.query.nuevoNombre;
  fs.rename(`archivos/${nombre}`, `archivos/${nuevoNombre}`, (err) => {
    if (err) {
      res.send("No fue posible renombrar el archivo");
    } else {
      console.log("Archivo renombrado");
    }
  });
});

//Rutas
app.get("/eliminar", (req, res) => {
  const archivo = req.query.archivo;
  fs.unlink(`archivos/${archivo}`, (err) => {
    if (err) {
      res.send("Error al eliminar el archivo");
    } else {
      res.send("Archivo eliminado");
    }
  });
});

//Server
app.listen(8080, () => {
  console.log("Puerto 8080");
});
