const express = require('express');
const knex = require('knex');
const knexConfig = require("./knexfile");

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());

// endpoints here

server.post("/zoos", (req, res) => {
  const newZoo = req.body;

  db.insert(newZoo)
    .into("Zoos")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
})

server.get('/zoos', (req, res) => {
  db.select()
    .from('Zoos')
    .then(records => res.status(200).json(records))
    .catch(err => res.status(500).json(err));
})

server.get("/zoos/:id", (req, res) => {
  const { id } = req.params;
  
  db.select()
    .from('Zoos')
    .where({id: id})
    .then(record => res.status(200).send(record))
    .catch(err => res.status(500).send(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});