import express from 'express';
import TasksRoutes from './routes/Tasks.routes.js';

const app = express();

app.use(express.json());

app.use('/api', TasksRoutes);

app.get('/', (req, res) => {
    return res.json({
        message: 'Rota principal'
    })
})

export default app;