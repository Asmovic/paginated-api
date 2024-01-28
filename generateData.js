const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const User = require('./models/User');
const Transaction = require('./models/Transaction'); // path to your User model

require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createUsers = async () => {
  console.log('About to create faker data...');
  const userData = [];
  for (let i = 0; i < 100; i++) {
    userData.push({
      name: faker.internet.userName(),
      email: faker.internet.email(),
    });
  }

  await User.insertMany(userData);
  console.log('100 fake users created!');
};
if (process.argv[2] === '--seed-user') {
  createUsers().then(() => {
    mongoose.connection.close();
  });
}

const seedTransactions = async () => {
  const transactions = [];

  for (let i = 0; i < 100; i++) {
    transactions.push({
      status: faker.helpers.arrayElement(['pending', 'completed', 'failed']),
      reference: faker.string.uuid(),
      amount: faker.finance.amount(),
      destination: faker.finance.bitcoinAddress(), // Or any other relevant field
    });
  }

  await Transaction.insertMany(transactions);
  console.log('100 fake transactions seeded!');
};

if (process.argv[2] === '--seed-tranx') {
  seedTransactions().then(() => {
    mongoose.connection.close();
  });
}
