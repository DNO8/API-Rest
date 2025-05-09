import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { moviesRouter } from './routes/movies.js';
const PORT=process.env.PORT ?? 8000;
const app= express();

app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());
app.use('/movies',moviesRouter)
app.listen(PORT,()=>{
    console.log(`servidor alojado en http://localhost:${PORT}`);
})