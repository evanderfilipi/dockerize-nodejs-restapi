'use strict';

module.exports = function(app) {
    var people = require('./controller');

    app.route('/')
        .get(people.index);

    app.route('/users')
        .get(people.users);

    app.route('/users/:id')
        .get(people.findUsers);

    app.route('/users')
        .post(people.create);

    app.route('/users')
        .put(people.update);

    app.route('/users/:id')
        .delete(people.delete);
}