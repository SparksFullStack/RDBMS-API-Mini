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
  db.select('name')
    .from('zoos')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
