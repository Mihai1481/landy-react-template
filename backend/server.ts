// backend/server.ts

import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectare la MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Conectat la MongoDB");

    const db = client.db("nutritie");
    const pacientiCollection = db.collection("pacienti");

    // Ruta de test
    app.get("/", (req, res) => {
      res.send("✅ Server funcționează!");
    });

    // Ruta API pentru pacienți
    app.get("/api/pacienti", async (req, res) => {
      try {
        const pacienti = await pacientiCollection.find().toArray();
        res.json(pacienti);
      } catch (err) {
        console.error("❌ Eroare la GET /api/pacienti:", err);
        res.status(500).send("Eroare server");
      }
    });

    app.listen(port, () => {
      console.log(`🚀 Server pornit pe http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Eroare la conectarea cu MongoDB:", err);
  }
}

startServer();
