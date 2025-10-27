import express from "express";
import { supabase } from "../db/supabaseClient";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
});

router.post("/", async (req, res) => {
  const { name, age, email } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert([{ name: name, age: age, email: email }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(200).json(data);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, age, email } = req.body;
  const { data, error } = await supabase
    .from("usuarios")
    .update({ nome, age, email })
    .eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("usuarios").delete().eq("id", id);
  if (error) return res.status(400).json({ error });
  res.json({ message: "Usuário deletado" });
});

export default router;
