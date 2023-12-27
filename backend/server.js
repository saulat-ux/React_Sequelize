const express = require('express');

const User = require('./models/user')
const sequelize = require('./util/database')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

try {
    sequelize.sync().then(res => {

    })

    console.log('Database sync successful!');
} catch (error) {
    console.error('Error syncing database:', error);
}

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/v1/user", userRoutes)




app.get("/", (req, res) => {
    res.send("home page....")
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
