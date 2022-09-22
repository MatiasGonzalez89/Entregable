const express = require("express");

const Productos = require("./api/productos.js");

let productos = new Productos();

const app = express();

//--------------------------------------------
//establecemos la configuración de ejs

app.set("view engine", "ejs");

//--------------------------------------------

app.use(express.static("public"));

const router = express.Router();
app.use("/api", router);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/productos/listar", (req, res) => {
	res.json(productos.getAll());
});

router.get("/productos/listar/:id", (req, res) => {
	let { id } = req.params;
	res.json(productos.getById(id));
});

router.post("/productos/guardar", (req, res) => {
	let producto = req.body;
	productos.post(producto);
	res.redirect("/");
});

router.put("/productos/actualizar/:id", (req, res) => {
	let { id } = req.params;
	let producto = req.body;
	productos.put(producto, id);
	res.json(producto);
});

router.delete("/productos/borrar/:id", (req, res) => {
	let { id } = req.params;
	let producto = productos.deleteById(id);
	res.json(producto);
});

router.get("/productos/vista", (req, res) => {
	let prods = productos.getAll();

	res.render("vista.ejs", {
		productos: prods,
		hayProductos: prods.length,
	});
});

const PORT = 8083;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
