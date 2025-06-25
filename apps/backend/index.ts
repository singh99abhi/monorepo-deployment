import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prismaClient.user.findMany();
  res.json(users);
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const user = await prismaClient.user.create({
    data: { username, password },
  });

  res.json(user);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
