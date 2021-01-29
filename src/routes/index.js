const express = require("express");
const router = express.Router();

const task = require("../models/taks");

router.get("/", async (req, res) => {
  const tareas = await task.find();

  console.log(tareas);
  res.render("index", {
    tareas,
  });
});

router.post("/agregar", async (req, res) => {
  const data = new task(req.body);

  await data.save();
  console.log(data);
  res.redirect("/");
});

router.get("/estado/:id", async (req, res) => {
  const { id } = req.params;
  const tarea = await task.findById(id);
  tarea.status = !tarea.status;
  await tarea.save();
  res.redirect("/");
});

router.get("/editar/:id", async (req, res) => {
  const { id } = req.params;
  const tarea = await task.findById(id);
  res.render("editar", {
    tarea,
  });
});

router.post("/editar/:id", async (req, res) => {
  const { id } = req.params;

  await task.updateOne({"_id": id}, req.body);
  res.redirect("/");
});

router.get("/borrar/:id", async (req, res) => {
  const { id } = req.params;
  await task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
