const User = require('../models/User'); // Adjust the path to your User model

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};