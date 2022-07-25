'use strict';
const fs = require('fs').promises;
const sequelize = require('../../config/database');



module.exports = {
    async up(queryInterface, Sequelize) {
        return fs.readFile('./db/migrations/up.sql').then(sql => {
            var promises = []
            var statements = sql.toString().split(';')
            for (var statement of statements)
                if (statement.trim() != '') promises.push(sequelize.query(statement))
            return Promise.all(promises)
        })
    },

    async down(queryInterface, Sequelize) {
        return fs.readFile('./db/migrations/down.sql').then(sql => {
            var promises = []
            var statements = sql.toString().split(';')
            for (var statement of statements)
                if (statement.trim() != '') promises.push(sequelize.query(statement))
            return Promise.all(promises)
        })
    }
};
