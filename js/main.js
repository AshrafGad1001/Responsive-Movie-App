const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');


const HandelFormSubmission = (e) => {
    e.preventDefault();
    let movieName = inputBox.value.trim();

    if (movieName !== '') {
        getMovieInfo(movieName);
    }
    else {
        showErrorMessage("Enter Movie Name To Get Movie Information");
    }



    inputBox.value = '';
}
searchForm.addEventListener('submit', HandelFormSubmission );
const getMovieInfo = async (movie) => {
  try {
    const myAPIKey = '76cc22b3';
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${myAPIKey}&t=${movie}`;

      const response = await fetch(url);
      
    if (!response.ok) {
          throw new Error('Unable To Fetch Movie Data.')
    }


      const Data = await response.json();
      console.log(Data);
    ShowMovieData(Data);
  }
  catch (error) {
      showErrorMessage('Movie Not Found');
    }

}

const ShowMovieData = (Data) => {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('noBackground');


    //Use Destracuring To Assignment To Extract Properties From Data Obj

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = Data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `
        <h2>${Title}</h2>
        <p><strong>Rating:&#11088;</strong>${imdbRating}</p>
    `;



    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(',').forEach(e => {
        const p = document.createElement('p');
        p.innerText = e;
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `
        <p><strong>Released Data: </strong>${Released}</p>
        <p><strong>Duration: </strong>${Runtime}</p>
        <p><strong>Cast: </strong>${Actors}</p>
        <p><strong>Plot: </strong>${Plot}</p>
    `;


    //Create Element For Movie Poster

    const MoviePosterElement = document.createElement('div');
    MoviePosterElement.classList.add('movie-poster');
    MoviePosterElement.innerHTML = `<img src="${Poster}" alt="">`;



    movieContainer.appendChild(MoviePosterElement);
    movieContainer.appendChild(movieElement);
    
}

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
        movieContainer.classList.add('noBackground');
}