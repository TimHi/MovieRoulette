var totalPages;
var baseURL;

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
  document.getElementById("MovieOutput").innerHTML = "";
  document.getElementById("searchButton").style.display = "none";
  sendRequest(getFullMovieURL);

}

//Refactor filter and total page sometimes
function getRandomMovie() {
  var pageIndex = Math.floor((Math.random() * totalPages) + 1);
  var getMovieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + pageIndex + '&vote_count.gte=100&with_runtime.gte=30&callback=getFullDetails';
  sendRequest(getMovieURL);
}

function getFilterPages(response) {
  if (response.total_results == 0) {
    alert("No results");
    document.getElementById("filterBox").style.display = "block";
  }
  if (response.total_results < 19) {
    var movieIndex = Math.floor((Math.random() * response.total_results) + 0);
    var movieID = response.results[movieIndex].id;
    var reqURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&callback=displayMovieFilter";
    sendRequest(reqURL);
  } else {
    var movieIndex = Math.floor((Math.random() * 19) + 0);
    var movieID = response.results[movieIndex].id;
    var reqURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&callback=displayMovieFilter";
    sendRequest(reqURL);
  }
}

function filterMovies() {
  var releaseYearBegin = document.getElementById("releaseYearBegin").value;
  var releaseYearEnd = document.getElementById("releaseYearEnd").value;
  var rating = document.getElementById("rating").value / 10;
  var adultBool = document.getElementById("adultBool").checked;
  baseURL = 'https://api.themoviedb.org/3/discover/movie?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US&sort_by=popularity.desc&include_adult=' +
    adultBool + '&include_video=false&page=1&primary_release_date.gte=' + releaseYearBegin + '&primary_release_date.lte=' + releaseYearEnd + '&vote_average.gte=' + rating;
  var baseFilterURL = baseURL + '&callback=getFilterPages';
  document.getElementById("filterBox").style.display = "none";
  sendRequest(baseFilterURL);
}

function resetFilter() {
  document.getElementById("MovieOutput").style.display = "none";
  document.getElementById("MovieOutput").innerHTML = "";
  document.getElementById("filterBox").style.display = "block";
}

//I really don't like this function
function displayMovieFilter(response) {
  var movieDetails = response;
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
    var releaseDateString = "<i>Release Date: " + movieDetails.release_date + "<br></i>";
    document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = releaseDateString;
  }
  var runtimeString = "Runtime: " + movieDetails.runtime + " Minutes";
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = runtimeString;
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<br>";
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<a href='#' onclick='resetFilter();'> New Search?</a> | <a href='" + tmdburl + "'>" + "TheMovieDB </a>";
}

//I really don't like this function x2
function displayMovie(response) {
  var movieDetails = response;
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
    var releaseDateString = "<i>Release Date: " + movieDetails.release_date + "<br></i>";
    document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = releaseDateString;
  }
  var runtimeString = "Runtime: " + movieDetails.runtime + " Minutes";
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = runtimeString;
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<br>";
  document.getElementById('MovieOutput').innerHTML += document.getElementById('MovieOutput').innerHTML = "<a href='#' onclick='getRandomMovie();'> Another?</a> | <a href='" + tmdburl + "'>" + "TheMovieDB </a>";
}
