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
  }
}