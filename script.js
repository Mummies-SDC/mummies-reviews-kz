import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '2m', target: 100 }, // below normal load
    // { duration: '5m', target: 100 },
    // { duration: '2m', target: 200 }, // normal load
    // { duration: '5m', target: 200 },
    // { duration: '2m', target: 300 }, // around the breaking point
    // { duration: '5m', target: 300 },
    // { duration: '2m', target: 400 }, // beyond the breaking point
    // { duration: '5m', target: 400 },
    // { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

let max = 1000011;
let min = 900011;
let randomId = Math.floor(Math.random() * (max - min) + min);

export default function () {
  http.get(`http://localhost:3000/reviews?product_id=${randomId}`);
  sleep(1);
}

// export default function () {
//   http.get(`http://localhost:3000/reviews/meta?product_id=${randomId}`);
//   sleep(1);
// }