import cors from 'cors';
import express, { Request, Response } from 'express';

// Express App Object Initilization -->
const app = express();

// Cors configuration -->
app.use(
  cors({
    origin: [process.env.CORS_URL || '', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Basic Configuration -->
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '16kb' }));

// Home Route -->
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is running!',
    timestamp: new Date().toISOString(),
  });
});

export default app;
