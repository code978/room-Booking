const mongoose = require('mongoose');


const connectDB = () => {
  try {

    mongoose.connect(process.env.MONGO_URI, {});

    console.log(`db connected Succefully.`)

  } catch (e) {
    console.log(`erorr in connecting db. `, e);
  }
}
module.exports = { connectDB }