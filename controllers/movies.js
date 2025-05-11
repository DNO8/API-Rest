import { MovieModel } from "../model/movie.js";
import { validateMovie,validatePartialMovie } from "../schemas/movies.js";
export class MovieController
{
    static async getAll(req,res){
        const {genre}=req.query
        const movies= await MovieModel.getAll({genre})
        res.json(movies)
    }
    static async getById(req,res){
        const{id}=req.params
        const  movie=await MovieModel.getById({id})
        if(movie)
            res.json(movie)  
        else
            res.status(404).json({message:'movie not found'});
    }
    static async create(req,res){
        const result = validateMovie(req.body)
            if(!result.success){
                return res.status(400).json({error: JSON.parse(result.error.message)})
            }
           const newMovie= await MovieModel.create({post:result.data}) 
            res.status(201).json(newMovie)
    }
    static async update(req,res){
    const {id}= req.params
    const result= validatePartialMovie(req.body)
    if(result.success){
        return res.status(400).json({error:JSON.parse(result.error.message)})
    }
    const updatedMovie= await MovieModel.update({id,input:result.data})
    return res.json(updatedMovie)
    }
    static async delete(req,res){
    const {id} = req.params
    const result = await MovieModel.delete({id})
    if(result===false)
    {
        return res.status(404).json({message:'Movie not found'})
    }
    return res.json({message:'Movie Deleted'})
}
}