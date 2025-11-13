import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/route';
import notFoundRoute from './app/middleware/notFoundRoute';
import handleGlobalError from './app/middleware/globalErrorHandler';

const app: Application = express();

// Parser
app.use(express.json());

// ✅ Allowed frontend URLs
const allowedOrigins = [
  'http://localhost:5173',
  'https://www.ssnmax.store',
  'https://ssnmax.store'
];

// ✅ Full CORS config
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Handle preflight requests globally
app.options('*', cors());

// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running`);
});

// Handle 404 and global errors
app.use(notFoundRoute);
app.use(handleGlobalError);

export default app;
