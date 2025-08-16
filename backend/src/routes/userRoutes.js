"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
// 🔐 Middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id };
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    else {
        return res.status(401).json({ message: 'No token provided' });
    }
};
// ✅ REGISTER ROUTE (add this before login route)
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// ✅ Get Current User
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        console.error('❌ Token verification failed:', err);
        res.status(401).json({ message: 'Invalid Token' });
    }
});
// ✅ Update Preferences
router.put('/preferences', authMiddleware, async (req, res) => {
    const { diet, calorieTarget, allergies } = req.body;
    try {
        const user = await User_1.default.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.preferences = {
            diet: diet || user.preferences?.diet || 'veg',
            calorieTarget: calorieTarget || user.preferences?.calorieTarget || 2000,
            allergies: allergies || user.preferences?.allergies || [],
        };
        await user.save();
        res.status(200).json({
            message: 'Preferences updated successfully',
            preferences: user.preferences,
        });
    }
    catch (error) {
        console.error('Update preferences error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
