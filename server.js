// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>  console.log('DB connection successful'));

const server = app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
