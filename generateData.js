const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User'); // path to your User model

mongoose.connect(
  'mongodb+srv://paginated-api:paginated-api-secret@main.emb8pyd.mongodb.net/?retryWrites=true&w=majority'
);

const createFakeData = async () => {
  console.log('About to create faker data...');
  const userData = [];
  for (let i = 0; i < 100; i++) {
    userData.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }
  /*   userData.push({
    name: 'Asogba Ibrahim',
    email: 'asogba007@gmail.com',
  }); */

  await User.insertMany(userData);
  console.log('100 fake users created!');
};
if (process.argv[2] === '--seed') {
  createFakeData().then(() => {
    mongoose.connection.close();
  });
}
