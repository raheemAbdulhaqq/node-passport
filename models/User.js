const { Client } = require("pg")
const { Sequelize, DataTypes, Model } = require("sequelize")
require("dotenv").config()

async function dbConnect() {
    const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
        host: process.env.PG_HOST,
        dialect: "postgres"
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


const sequelize = new Sequelize('postgres::memory:');
class User extends Model {}
User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        default: Date.now
    }
}, {
    //other model options
    sequelize,
    modelName: "User"
})

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = {
    dbConnect,
    User
}