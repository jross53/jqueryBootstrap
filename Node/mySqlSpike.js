/**
 * Created by Jordan.Ross on 4/17/2017.
 */
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'spike',
    password: 'spike',
    database: 'spike'
});

connection.connect();
connection.query(`INSERT INTO spike (SpikeText) values('insertSpike')`, function (err, rows, fields) {
    if (err) {
        throw err;
    }
    console.log('The solution is: ', rows);
});

// connection.query('SELECT * from spike', function (err, rows, fields) {
//     if (err) {
//         throw err;
//     }
//     console.log('The solution is: ', rows);
// });

connection.end();