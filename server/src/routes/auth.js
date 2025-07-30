const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; // Replace with process.env.JWT_SECRET in production

// Register a new user
async function register(username, password, bio, profileUrl) {
    const existing = await User.findOne({ username });
    if (existing) throw new Error('Username already taken');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, bio, profileUrl });
    await user.save();
    return user;
}

// Login a user
async function login(username, password) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return { user, token };
}

// Middleware to protect routes
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).send('Invalid token');
    }
}

module.exports = { register, login, authMiddleware };