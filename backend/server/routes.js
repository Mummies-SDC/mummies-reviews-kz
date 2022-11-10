const express = require('express');
const router = express.Router();
// const client = require('../database/database.js');
const controller = require('./controller.js');


router.get('/reviews', async (req, res) => {

  controller.getReviews(req.query)
    .then((result) => {
      res.status(200).json(result)
    })
});


router.post('/reviews', (req, res) => {
  controller.postReview(req.body)
    .then((result) => {
      // res.sendStatus(201).json(result);
      res.json(result);
    })
});
// router.post('/reviews', async (req, res) => {
//   await client.query(`INSERT INTO reviews VALUES ${req.body}`)
//   res.status(201);
// });

router.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;
  controller.getMeta(req.query)
    .then((result) => {
      res.status(200).json(result);
    })
    // const result = await client.query(`
    // SELECT json_object_agg(rating, c) AS ratings
    // FROM (
    //   SELECT rating, COUNT(*) AS c
    //   FROM reviews
    //   WHERE reviews.product_id = ${product_id}
    //   GROUP BY reviews.rating
    //   )t`)

    //   res.json(result);
});

router.put('/reviews/:review_id/helpful', async (req, res) => {
  const { review_id } = req.params;
  const result = await client.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${review_id}`);
  res.json({status: 204});

});

router.put('/reviews/:review_id/report', async (req, res) => {
  const { review_id } = req.params;
  const result = await client.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`);
  res.json({status: 204});
});

module.exports = router;
