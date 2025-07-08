import express from 'express';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

export default app;
