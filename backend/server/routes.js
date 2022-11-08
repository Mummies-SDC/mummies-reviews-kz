const express = require('express');
const router = express.Router();
const client = require('../database/database.js');
// const controller = require('./controller.js');


router.get('/reviews', async (req, res) => {
  const { product_id, page, count, sort } = req.query;
  // with controller modulization
  // controller.getReviews(req.query)
  //   .then((result) => {
  //     res.json(result)
  //   })

  const reviewResults = await client.query(`SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.reponse, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, (SELECT array_to_json(array_agg(row_to_json(d))) FROM (SELECT reviews_photos.id, reviews_photos.url FROM reviews_photos WHERE reviews_photos.review_id = reviews.id) d ) as photos FROM reviews WHERE reviews.product_id = ${product_id} AND reviews.reported = false`);

  const { rows } = reviewResults;

  const response = {
    "product": product_id,
    "page": page || 1,
    "count": count || 5,
    "results": rows,
  };

  res.json(response);
});

router.post('/reviews', async (req, res) => {
  await client.query(`INSERT INTO reviews VALUES ${req.body}`)
  res.status(201);
});

router.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;

  // also need to grab all the ratings from reviews where prodcut id = id
  // const result = await client.query(`SELECT id, rating FROM reviews WHERE product_id = ${product_id}`);

  // const result2 = await client.query(`SELECT id, name FROM characteristics WHERE product_id = ${product_id}; SELECT value FROM characteristic_reviews WHERE characteristic_id = characteristics.id`);

  const result = await client.query(`
    SELECT json_object_agg(rating, c) AS ratings
    FROM (
      SELECT rating, COUNT(*) AS c
      FROM reviews
      WHERE reviews.product_id = ${product_id}
      GROUP BY reviews.rating
    )t`)

    // SELECT json_object_agg(reviews.rating, COUNT(*))
    // FROM (
    //   SELECT ratings, COUNT(*)
    //   FROM reviews
    //   WHERE reviews.product_id = ${product_id}
    // )
    // GROUP BY reviews.rating`)

  // (
  //   SELECT row_to_json(t)
  //   FROM (
  //     SELECT name AS feature

  //     FROM characteristics
  //     WHERE characteristics.product_id = ${product_id}
  //   ) t
  // ) AS characteristics

  // (
  //   SELECT row_to_json(t)
  //   FROM (
  //     SELECT rating AS ratings, COUNT(*)
  //     FROM reviews
  //     WHERE reviews.product_id = ${product_id}
  //     GROUP BY rating
  //   ) t
  // )

  // (
  //   SELECT id, value
  //   FROM characteristics_reviews
  //   WHERE characteristic_reviews.characteristic_id = characteristics.id
  // )

  // const result = await client.query(`SELECT * FROM characteristics WHERE product_id = ${product_id} JOIN characteristic_reviews ON characteristic_reviews.characteristic_id = characteristics.id`);
  res.json(result);

  // using characterists_id, find characteristic_reviews

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
