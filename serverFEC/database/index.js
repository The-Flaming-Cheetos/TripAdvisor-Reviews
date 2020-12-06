var mysql = require('mysql');


module.exports.db = mysql.createConnection({
  user: 'root',
  password: 'PassW0rd!',
  database: 'tripAdvisor'
});




