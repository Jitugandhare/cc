const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const connection = mongoose.connect("mongodb://localhost:27017/neighbourhood_helping_app")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err))


module.exports = connection;