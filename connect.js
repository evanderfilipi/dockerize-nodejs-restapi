var mysql = require('mariadb/callback');

var con = mysql.createConnection({
    host: "172.20.0.22",
    user: "root",
    password: "root",
    database: "db_crud_nodejs"
});

con.connect(function (err){
    if(err) throw err;
    console.log('Successfully connect to mysql!')
});

module.exports = con;