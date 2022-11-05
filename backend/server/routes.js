const express = require('express');
const router = express.Router();
const client = require('../database/database.js');


router.get('/reviews/:id', async (req, res) => {
  const { id } = req.params;
  const result = await client.query(`SELECT * FROM reviews WHERE product_id = ${id} AND reported = false`);
  res.json(result);
});

router.post('/reviews', async (req, res) => {
  await client.query(`INSERT INTO reviews VALUES ${req.body}`)
  res.status(201);
});

router.get('/reviews/meta', async (req, res) => {
  const { id } = req.params;
  const result = await client.query(`SELECT * FROM characteristics WHERE product_id = ${id}`);
  // using characterists_id, find characteristic_reviews
});

router.put('/reviews/:review_id/helpful', async (req, res) => {
  const { review_id } = req.params;
  const result = await client.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
  res.status(204);
});

router.put('/reviews/:review_id/report', async (req, res) => {
  const { review_id } = req.params;
  const result = await client.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`);
  res.status(204);
});

module.exports = router;