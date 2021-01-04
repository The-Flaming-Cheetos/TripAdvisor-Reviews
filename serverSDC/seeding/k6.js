import http from 'k6/http';
import { sleep } from 'k6';
export let options = {
  // vus: 1000,
  // duration: '30s',
  // // iterations: 100
  stages: [
    { duration: "10s", target: 200 },
    { duration: "1s", target: 500 },
    { duration: "5s", target: 800 },
  ],
}
export default function () {
  var index = Math.floor(Math.random() * 1000);
  http.get(`http://localhost:5000/api/attractions/${index}/reviews`);
}