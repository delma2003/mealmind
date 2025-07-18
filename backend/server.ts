import express, { Request, Response } from 'express'; // ✅ 1st line fix

import connectDB from './db'; // ✅ 5th line fix: must match actual file name (case-sensitive)

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
