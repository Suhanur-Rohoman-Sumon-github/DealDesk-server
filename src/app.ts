import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import router from './app/routes/route';
import notFoundRoute from './app/middleware/notFoundRoute';
import handleGlobalError from './app/middleware/globalErrorHandler';

const app: Application = express();

// parser
app.use(express.json());
// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error('CORS policy: Access denied'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));



// Application routers
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`server  is building`);
});

// handle 404 route
app.use(notFoundRoute);
app.use(handleGlobalError);

export default app;
