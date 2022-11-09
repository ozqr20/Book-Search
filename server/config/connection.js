const mongoose = require('mongoose');

const DB = process.env.DATABASE

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('Connected!')
  })
  .catch((error) => {
    console.log(error.message)
  })

//module.exports = mongoose.connection;
