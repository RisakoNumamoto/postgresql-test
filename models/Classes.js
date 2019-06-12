const Sequelize = require('sequelize');
const db = require('../config/database');

const Classes = db.define('classes', {
    className:{
        type: Sequelize.STRING
    },
    instructor:{
        type: Sequelize.STRING
    },
    time:{
        type: Sequelize.STRING
    },
    info:{
        type: Sequelize.STRING
    }
});

module.exports = Classes;