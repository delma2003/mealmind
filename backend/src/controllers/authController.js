"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User_1.default.findOne({ email });
        if (existing)
            return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await User_1.default.create({ name, email, password: hashedPassword });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ token, user: { name: newUser.name, email: newUser.email } });
    }
    catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // ✅ Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // ✅ Send token and user data
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};
exports.loginUser = loginUser;
