import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/health", async (_, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/materials", async (_, res) => {
  const { rows } = await pool.query(
    "SELECT id, name, price_per_m2, pack_m2 FROM materials ORDER BY id"
  );
  res.json(rows);
});

app.get("/api/patterns", async (_, res) => {
  const { rows } = await pool.query(
    "SELECT id, name, waste_percent FROM laying_patterns ORDER BY id"
  );
  res.json(rows);
});

app.get("/api/skirting", async (_, res) => {
  const { rows } = await pool.query(
    "SELECT id, name, price_per_meter, piece_length_m FROM skirting ORDER BY id"
  );
  res.json(rows);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API on :${port}`));
