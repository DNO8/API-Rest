import { Router } from "express";
import { validateMovie,validatePartialMovie } from "../schemas/movies.js";
import { randomUUID } from 'node:crypto';
import movies from '../json/movies.json' with {type:"json"};
export const moviesRouter= Router()

moviesRouter.get('/',(req,res)=>{
    const {genre}=req.query
    if(genre)
    {
        const filteredMovies=movies.filter(movie=>movie.genre.some(g=>g.toLowerCase()===genre.toLowerCase()))
        return res.json(filteredMovies)
    }
    res.json(movies);
})
moviesRouter.get('/:id',(req,res)=>{
    const{id}=req.params
    const movie=movies.find(movie=> movie.id===id)
    if(movie)
        res.json(movie)
    else
        res.status(404).json({message:'movie not found'});
})
moviesRouter.post('/',(req,res)=>{
    const result = validateMovie(req.body)
        if(!result.success){
            return res.status(400).json({error: JSON.parse(result.error.message)})
        }
        const newMovie={
            id: randomUUID(),
            ...result.data
        }
        movies.push(newMovie)
        res.status(201).json(newMovie)
})
moviesRouter.patch('/:id',(req,res)=>{
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
moviesRouter.delete('/:id',(req,res)=>{
    const {id} = req.params
    const movieIndex=movie.findIndex(movie=>movie.id===id)
    if(movieIndex===-1)
    {
        return  res.status(404).json({message:'Movie Not Found'})
    }
    movie.splice(movieIndex,1);
    return res.json({message:'Movie Deleted'})
})