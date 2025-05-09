const z=require('zod')
const movieSchema= z.object({
    title:z.string({
        invalid_type_error:'movie title must be a string',
        required_error:'movie title is required',
    }),
    year:z.number().int().positive(),
    director:z.string(),
    duration:z.number().int().positive(),
    rate:z.number().min(0).max(10),
    poster:z.string().url({
        message:'must be a valid URL'
    }),
    genre:z.array(
        z.enum(['Action','Adventure','Terror','Comedy','Drama','Fantasy']),
        {
            required_error:'movie genre is required',
            invalid_type_error:'movie invalid enum genre'
        }

    )


})
function validateMovie(object)
{
    return movieSchema.safeParse(object)
}
function validatePartialMovie(object)
{
    return movieSchema.partial().safeParse(object)
}
module.exports={validateMovie,validatePartialMovie}