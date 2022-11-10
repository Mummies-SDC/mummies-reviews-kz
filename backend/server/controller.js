const client = require('../database/database.js');

module.exports = {

  getReviews: async function({ product_id, page, count, sort }) {

  const reviewResults = await client.query(`SELECT reviews.id, reviews.rating, reviews.summary, reviews.recommend, reviews.reponse, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness,
  (
    SELECT array_to_json(array_agg(row_to_json(d)))
    FROM
      (
        SELECT reviews_photos.id, reviews_photos.url
        FROM reviews_photos
        WHERE reviews_photos.review_id = reviews.id
      ) d
  ) as photos
  FROM reviews WHERE reviews.product_id = ${product_id} AND reviews.reported = false`);

  const { rows } = reviewResults;

  const response = {
    "product": product_id,
    "page": page || 1,
    "count": count || 5,
    "results": rows,
  };

    return response;
  },

  postReview: async function( reqData ) {
    const {product_id, rating, summary, reviewer_name} = reqData;
    console.log(product_id, rating, summary, reviewer_name)
    const queryStr = `INSERT INTO reviews (product_id, rating, summary, reviewer_name, helpfulness)
    VALUES (${product_id}, ${rating}, '${summary}', '${reviewer_name}', 0)`;

    await client.query(queryStr)
      .then((result) => {
        return result})
      .catch((err) => console.log(err))
    // res.status(201);
    // return "post working"
  },

  getMeta: async function({ product_id }) {

    const result = await client.query(`
    SELECT json_object_agg(rating, c) AS ratings, json_object_agg(recommend, c2) AS recommended, json_object_agg(name, c2) AS characteristics
    FROM (
      SELECT rating, COUNT(*) AS c
      FROM reviews
      WHERE reviews.product_id = ${product_id}
      GROUP BY reviews.rating
    )ratings, (
      SELECT recommend, COUNT(*) AS c2
      FROM reviews
      WHERE reviews.product_id = ${product_id}
      GROUP BY reviews.recommend
    )recommended, (
      SELECT name
      FROM characteristics
      WHERE characteristics.product_id = ${product_id}
      GROUP BY characteristics.name
    )characteristics`)

    return result;
  },


}