// backend/src/routes/userRoutes.ts
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

// 🔐 Middleware
const authMiddleware = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      req.user = { id: decoded.id };
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

// ✅ REGISTER ROUTE (add this before login route)
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Login Route
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
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
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get Current User
router.get('/me', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('❌ Token verification failed:', err);
    res.status(401).json({ message: 'Invalid Token' });
  }
});

// ✅ Update Preferences
router.put('/preferences', authMiddleware, async (req: Request & { user?: any }, res: Response) => {
  const { diet, calorieTarget, allergies } = req.body;

  try {
    const user = await User.findById(req.user.id);

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
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
