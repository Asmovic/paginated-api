const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // path to your User model

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://paginated-api:paginated-api-secret@main.emb8pyd.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Paginated API');
});

// Pagination API
app.get('/users', async (req, res) => {
  try {
    let { page, limit, name, email } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    // Constructing filter object
    let filters = {};
    if (name) {
      filters.name = new RegExp(name, 'i'); // 'i' for case-insensitive
    }
    if (email) {
      filters.email = new RegExp(email, 'i');
    }

    const users = await User.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await User.countDocuments(filters);

    res.status(200).json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
