const express = require("express");

const books = require("./books.json");

const app = express();
app.use(express.json())

const logger = (req, res, next) =>{
    req.name = "Prasad Baviskar";
    next();
}

app.use(logger);

app.get("/",(req, res) => {
    let data = {api_requested_by: req.name,
    books:books}
    res.send(data)
});

app.get("/books/:id",(req, res)=>{
    var newBook = books.filter((book) =>  book.id == req.params.id);
    newBook = Object(newBook)
    let data = {api_requested_by: req.name,book:newBook}

    res.send(data);
    
});

app.post("/books",(req, res)=>{
    var newBooks = [...books, req.body];

    let data = {api_requested_by: req.name,book:newBooks}

    res.send(data);
})

app.patch("/:id",(req, res)=>{ 

    var newBook = books.map((book)=>{
        if(book.id == req.params.id){
            if(req?.body?.id) book.id = req.body.id;
            if(req?.body?.author) book.author = req.body.author;
            if(req?.body?.book_name) book.book_name = req.body.book_name;
            if(req?.body?.pages) book.pages = req.body.pages;
            if(req?.body?.published_year) book.published_year = req.body.published_year;
        }
        return book;
    });

    newBook = Object(newBook)
    let data = {api_requested_by: req.name, book:newBook}

    res.send(data);
})


app.delete("/:id",(req, res)=>{
    var newBooks = books.filter((book) => book.id != req.params.id);

    let data = {api_requested_by: req.name, books:newBooks}
    res.send(data)
})

app.listen(1234,function(){
    console.log("Listing 1234")
})