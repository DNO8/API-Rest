import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { moviesRouter } from './routes/movies.js';
import rateLimit from "express-rate-limit";

const PORT=process.env.PORT ?? 8000;
const app= express();
const limiter=rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 60, // máximo de 10 peticiones por IP
    standardHeaders: true, // muestra cabeceras estándar
    legacyHeaders: false, // desactiva cabeceras obsoletas
    message: {
        status: 429,
        message: 'Demasiadas peticiones, intenta más tarde.'
    }
})
app.disable('x-powered-by');
app.use(limiter);
app.use(json());
app.use(corsMiddleware());
app.use('/movies',moviesRouter)
app.listen(PORT,()=>{
    console.log(`servidor alojado en http://localhost:${PORT}`);
})