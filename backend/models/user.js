const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs")


const sequelize = require('../util/database')

const User = sequelize.define('user' , {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    
    email: {
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    ImageURL: {
        type: Sequelize.STRING,
        defaultValue: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg' 
    }
  

},{
    hooks: {
        beforeCreate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.password = hashedPassword;
            }
        }
    }
});




module.exports = User

