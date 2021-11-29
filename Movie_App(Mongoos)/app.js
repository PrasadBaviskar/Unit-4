const express =  require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

const connect = () => { 
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
});
}

const movieSchema = new mongoose.Schema({
    movie_name: {type: String},
    movie_genre: {type: String},
    production_year: {type: Number},  
    budget: {type: Number}
},{
    versionKey: false,
    timestamps:true
});

const Movie = mongoose.model("Movie",movieSchema);

// get all movies

app.get("/movies",async (req, res)=>{
    try{
        const movies =await Movie.find({}).lean().exec();
        res.status(200).send(movies);
    }
    catch(e){
        res.send(e);
    }
    
})

// add movie

app.post("/movies", async (req, res) => {
    console.log(req.body)
   const movie = await Movie.create(req.body);
//    const m = await movie.save();
   res.status(201).send(movie);
})

// get a single movie

app.get("/movies/:id", async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        res.status(201).send(movie);
    }
    catch(err){
        res.status(400).send(err)
    }
})

// update single movie

app.patch("/movies/:id", async (req, res) => {
    try{
        const updated_movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.send(updated_movie);
    }
    catch(err){
        res.status(400).send(err);
    }
});

// delet single movie

app.delete("/movies/:id", async (req, res) => {
    try{
        const movie = await Movie.findByIdAndDelete(req.params.id);
        res.send(`${movie} deleted sucessfuly`)
    }
    catch(err){
        res.status(400).send(err);
    }
})

const start =async () => {
    await connect();

    app.listen(3000,()=>{
        console.log("listning port 3000");
    })
}

start();