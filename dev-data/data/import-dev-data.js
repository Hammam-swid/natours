const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');
const Review = require('../../models/reviewModel');

dotenv.config({ path: './../../config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const tours = fs.readFileSync('./tours.json', 'utf-8');
const users = fs.readFileSync('./users.json', 'utf-8');
const reviews = fs.readFileSync('./reviews.json', 'utf-8');

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log('DB connection successful');
  });

const importData = async () => {
  try {
    // console.log(JSON.parse(tours)[0].locations);
    await Tour.create(JSON.parse(tours));
    await User.create(JSON.parse(users), { validateBeforeSave: false });
    await Review.create(JSON.parse(reviews));
    // console.log('data inserted successfully');
    process.exit();
  } catch (error) {
    // console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    // console.log('data deleted successfully');
    process.exit();
  } catch (error) {
    // console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
