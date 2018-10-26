var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '8889',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'CMPE_273_Homeaway'
})


module.exports = pool;