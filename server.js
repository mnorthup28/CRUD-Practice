import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  database: "sampledb",
});

await client.connect();

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
  res.json("Check one, Check one, two");
});

app.get("/sample", (req, res) => {
  console.log("hello");
  client
    .query(`SELECT * FROM sampletable`)
    .then((data) => {
      console.log(data.rows);
      res.send(data.rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

app.post("/sample", (req, res) => {
  const { name, bool } = req.body;
  const newSample = { name, bool };
  console.log("newSample: ", newSample);
  client
    .query(`INSERT INTO sampletable(name, bool) VALUES ($1, $2) RETURNING *`, [
      name,
      bool,
    ])
    .then((data) => {
      console.log(data.rows[0]);
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete("/sample/:id", (req, res) => {
  const sampleId = Number.parseInt(req.params.id);
  client
    .query(`DELETE FROM sampletable WHERE id = $1 RETURNING *`, [sampleId])
    .then((data) => {
      if (data.rows[0] !== undefined) {
        res.json(data.rows);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
});

// app.patch();

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
