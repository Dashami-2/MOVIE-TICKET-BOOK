const movieSelect = document.getElementById("movie");
const movieList = document.getElementById("movies");

async function loadMovies() {

    const response = await fetch("/api/movies");
    const movies = await response.json();

    movieSelect.innerHTML = "";
    movieList.innerHTML = "";

    movies.forEach(movie => {

        movieSelect.innerHTML += `
            <option value="${movie.title}">
                ${movie.title}
            </option>
        `;

        movieList.innerHTML += `
            <div style="border:1px solid gray;padding:10px;margin:10px;">
                <h3>${movie.title}</h3>
                <p>Price : ₹${movie.price}</p>
            </div>
        `;

    });

}

async function bookTicket() {

    const name = document.getElementById("name").value;
    const movie = document.getElementById("movie").value;
    const seats = document.getElementById("seats").value;

    if(name==="" || seats===""){
        alert("Please fill all fields");
        return;
    }

    const response = await fetch("/api/book",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            movie,
            seats
        })

    });

    const result = await response.json();

    alert(result.message);

    document.getElementById("name").value="";
    document.getElementById("seats").value="";
}

loadMovies();