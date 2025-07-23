const User = require('../models/User');

// Add a new user
async function addUser(username, bio, profileUrl) {
    const newUser = new User({ username, bio, profileUrl });
    await newUser.save();
    return newUser;
}

// Update username
async function updateUsername(userId, newUsername) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    user.username = newUsername;
    await user.save();
    return user;
}

module.exports = { addUser, updateUsername };