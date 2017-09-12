var totalPages;

function sendRequest(reqURL) {
  var tag = document.createElement("script");
  tag.src = reqURL;
  document.getElementById("MovieOutput").appendChild(tag);
}

function getTotalPages() {
  var totalPageURL = 'https://api.themoviedb.org/3/discover/movie?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_runtime.gte=30&callback=setTotalPages';
  sendRequest(totalPageURL);
}

function setTotalPages(response) {
  totalPages = response.total_pages;
}

function getFullDetails(response) {
  var movieIndex = Math.floor((Math.random() * 19) + 0);
  var movieDetails = response.results[movieIndex];
  var movieID = movieDetails.id;
  var getFullMovieURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&callback=displayMovie";
  sendRequest(getFullMovieURL);

}

function getRandomMovie() {
  var pageIndex = Math.floor((Math.random() * totalPages) + 1);
  var getMovieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageIndex + '&vote_count.gte=100&with_runtime.gte=30&callback=getFullDetails';
  sendRequest(getMovieURL);
}

//I really don't like this function
function displayMovie(response) {
  var movieDetails = response;
  document.getElementById("MovieOutput").innerHTML = "";
  document.getElementById("searchButton").style.display = "none";
  var image = document.createElement("img");
  var poster = "https://image.tmdb.org/t/p/w640" + movieDetails.poster_path;
  image.setAttribute("height", "540");
  image.setAttribute("width", "370");
  image.src = poster;
  var tmdburl = "https://www.themoviedb.org/movie/" + movieDetails.id;
  document.getElementById("MovieOutput").appendChild(image);
  document.getElementById('MovieOutput').style.display = "block";
  var titleString = "<br> <h1>" + movieDetails.original_title + "</h1>"
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = titleString;
  if (movieDetails.tagline != undefined) {
    document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = movieDetails.tagline;
    document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<br>";
  }
  if (movieDetails.release_date != undefined) {
    var releaseDateString = "<i>" + movieDetails.release_date + "<br></i>";
    document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = releaseDateString;
  }
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = movieDetails.runtime;
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<br>";
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<a href='#' onclick='getRandomMovie();'> Another?</a> | <a href='" + tmdburl + "'>" + "TheMovieDB </a>";
}
