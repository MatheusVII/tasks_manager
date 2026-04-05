import express from 'express';
import TasksRoutes from './routes/Tasks.routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost"
}));

app.use('/api', TasksRoutes);

app.get('/', (req, res) => {
    return res.json({
        message: 'Rota principal'
    })
})

export default app;