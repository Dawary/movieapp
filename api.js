const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGRkYmIzYjU4M2VkZWIyNTYyNjFmNzNmM2I3YzEwNiIsInN1YiI6IjY1NWI4ZWE0N2YwNTQwMThkNTE3ZTJhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kezX1rR8OyezuIUoJTdyBBkH0kHqj8cZDByyaC5_ilA'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        const randomIndex= Math.floor(Math.random() * response.results.length) ;
        
        const movieTitle = response.results[randomIndex].title;
        document.querySelector(".title-info h1").textContent = movieTitle;

        const movieOverview = response.results[randomIndex].overview;
        document.querySelector(".title-info-synopsis").textContent = movieOverview;


        const maturityNUmber = response.results[randomIndex].adult ? "18+" : "16+";
        document.querySelector(".maturity-number").textContent = maturityNUmber;

        const voteAverage = response.results[randomIndex].vote_average;
        document.querySelector(".vote-average").textContent = voteAverage;

        const language = response.results[randomIndex].original_language;
        document.querySelector(".language").textContent =language;

        const year= response.results[randomIndex].release_date;
        document.querySelector(".item-year span").textContent =year;
        
        const movieBackdrop = response.results[randomIndex].backdrop_path;
        const backdropUr1 = 'https://image.tmdb.org/t/p/original' + movieBackdrop;

        document.querySelector(".bg-img").style.backgroundImage = `url(${backdropUr1})`;

        const imageContainer = document.getElementById("imageContainer");
        const carousel = document.createElement('div');
        carousel.classList = 'carousel';

        const shuffledResults = response.results.sort(() => 0.5 - Math.random());
        shuffledResults.slice().forEach(movie => {
            const img = document.createElement('img');
            img.src = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            img.alt = 'Movie Poster';
            img.style.objectFit = 'cover';
            img.width = 330;
            img.height = 190;
            carousel.appendChild(img);
        });

        imageContainer.innerHTML = '';
        imageContainer.appendChild(carousel);

    })
    .catch(err => console.error(err));