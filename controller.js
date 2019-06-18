'use strict';

var response = require('./res');
var connection = require('./connect');

exports.users = function(req, res){
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hai, Selamat datang di API Users!", res)
};

exports.findUsers = function(req, res) {
    var id = req.params.id;

    connection.query('SELECT * FROM users where id = ?',
    [ id ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    });
};

exports.create = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;

    connection.query('INSERT INTO users (name, email) VALUES (?,?)',
    [name, email],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Berhasil menambahkan data user!", res)
        }
    });
}

exports.update = function(req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;

    connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?',
    [ name, email, id ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Berhasil memperbarui data user!", res)
        }
    });
};

exports.delete = function(req, res) {
    var id = req.params.id;

    connection.query('DELETE FROM users WHERE id = ?',
    [ id ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Berhasil menghapus data user!", res)
        }
    });
};