const client = require('../database/database.js');

module.exports = {
  // getReviews: async function({ product_id, page, count, sort }) {
  //   const reviewResults = await client.query(`SELECT * FROM reviews LEFT JOIN reviews_photos ON reviews_photos.review_id = reviews.id WHERE reviews.product_id = ${product_id}`)
  //   const { rows } = reviewResults;

  //   const response = {
  //     "product": product_id,
  //     "page": page || 1,
  //     "count": count || 5,
  //     "results": rows,
  //     // "urls": photosResult
  //   };

  //   return response;
  // }
}