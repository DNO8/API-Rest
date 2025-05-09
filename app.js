const express=require('express');
const crypto=require('node:crypto');
const movies= require('./json/movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');
const PORT=process.env.PORT ?? 8000;
const app= express();

app.disable('x-powered-by');
app.use(express.json());

app.get('/movies', (req,res)=>{
    res.header('Access-Control-Allow-Origin','*')
    const {genre}=req.query
    if(genre)
    {
        const filteredMovies=movies.filter(movie=>movie.genre.some(g=>g.toLowerCase()===genre.toLowerCase()))
        return res.json(filteredMovies)
    }
    res.json(movies);
})
app.get('/movies/:id', (req,res)=>{
    const{id}=req.params
    const movie=movies.find(movie=> movie.id===id)
    if(movie)
    res.json(movie)
    else
    res.status(404).json({message:'movie not found'});
    
})
app.post('/movies',(req,res)=>{
    
    const result = validateMovie(req.body)
    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    const newMovie={
        id: crypto.randomUUID(),
        ...result.data
    }
    movies.push(newMovie)
    res.status(201).json(newMovie)
})
app.patch('/movies/:id',(req,res)=>{
    const {id}= req.params
    const result= validatePartialMovie(req.body)
    const movieIndex=movies.findIndex(movie=> movie.id===id)
    if(!result.success)
    {
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }
    if(movieIndex===-1)
    {
        return res.status(404).json({message:'movie not found'})
    }
    const updateMovie={
        ...movies[movieIndex],
        ...result.data,
    }
    movies[movieIndex]=updateMovie
    return res.json(updateMovie)

})
app.listen(PORT,()=>{
    console.log(`servidor alojado en http://localhost:${PORT}`);
})