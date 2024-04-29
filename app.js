import express from "express";
import bwipjs from "bwip-js";
import { engine } from "express-handlebars";

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  const barcodeValue = "Nombre: Agua Roque 500ML Precio: $10.00 MXN"; // Valor del código de barras
  bwipjs.toBuffer(
    {
      bcid: "code128", // Código de barras: Code 128
      text: barcodeValue, // Valor del código de barra
      scale: 3, // Escala del código de barras
      height: 10, // Altura del código de barras
    },
    function (err, png) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error generando el código de barras");
      }
      // Convertir el buffer de la imagen a base64
      const base64Image = Buffer.from(png).toString("base64");
      // Renderizar la vista y pasar la imagen base64 como datos
      res.render("home", { barcodeImage: base64Image });
    }
  );
});

app.listen(3000);
