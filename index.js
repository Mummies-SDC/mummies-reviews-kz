const express = require('express');
const client = require('./backend/database/database.js');
const routes = require('./backend/server/routes.js')

const app = express();

app.use(express.json());

app.use('/', routes);

// app.get('/reviews/:id', async (req, res) => {
//   const { id } = req.params;
//   const result = await client.query(`SELECT * FROM reviews WHERE product_id = ${id}`);
//   res.json(result);
// });

// app.post('/reviews', async (req, res) => {

// });

// app.get('/reviews/meta', async (req, res) => {

// });

// app.put('/reviews/:review_id/helpful', async (req, res) => {
//   const { review_id } = req.params;
//   res.json(review_id);
// });

// app.put('/reviews/:review_id/report', async (req, res) => {
//   const { review_id } = req.params;

// });

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening on ${process.env.PORT || 3000}`);
    console.log('successfully connected for SDC');
  }
});
