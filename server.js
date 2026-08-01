const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


const bookings = [];

// Get all movies
app.get("/api/movies", (req, res) => {
    res.json(movies);
});

// Book ticket
app.post("/api/book", (req, res) => {

    const booking = {
        name: req.body.name,
        movie: req.body.movie,
        seats: req.body.seats
    };

    bookings.push(booking);

    res.json({
        message: "Ticket Booked Successfully!"
    });

});

// View bookings
app.get("/api/bookings", (req, res) => {
    res.json(bookings);
});
let movies = [
    { id: 1, title: "Avengers: Endgame", price: 250 },
    { id: 2, title: "KGF Chapter 2", price: 200 },
    { id: 3, title: "Pushpa 2", price: 220 },
    { id: 4, title: "Leo", price: 180 }
];
app.put("/api/movies/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const movie = movies.find(movie => movie.id === id);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    movie.title = req.body.title || movie.title;
    movie.price = req.body.price || movie.price;

    res.json({
        message: "Movie updated successfully",
        movie: movie
    });
});

app.delete("/api/movies/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = movies.findIndex(movie => movie.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    movies.splice(index, 1);

    res.json({
        message: "Movie deleted successfully"
    });

});

app.listen(PORT, () => {
    console.log("Server Running at http://localhost:3000");
});