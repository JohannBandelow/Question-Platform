//Imports necessary files
const Sequelize = require("sequelize");
const connection = require("./database");

const AnswerModel = connection.define("answers", {
    
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

AnswerModel.sync({force: false});

module.exports = AnswerModel;