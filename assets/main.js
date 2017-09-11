var latestID;
function getLastID() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.themoviedb.org/3/movie/latest?api_key=afe4e10abbb804e2b4a4f8a3ef067ad5&language=en-US", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  var str = JSON.stringify(response, null, 2);
  latestID = response.id;
  //document.getElementById('test').innerHTML=response.id;
}

function getMovieDetails(reqURL){
  //Check for error & empty poster
  var bhttp = new XMLHttpRequest();
  bhttp.open("GET", reqURL, false);
  bhttp.setRequestHeader("Content-type", "application/json");
  bhttp.send();
  var response = JSON.parse(bhttp.responseText);
  var str = JSON.stringify(response, null, 2);
  //return str;
  return response;
}

function displayMovie(movieDetails){
  
  var image = document.createElement("img");
  var poster = "https://image.tmdb.org/t/p/w640" + movieDetails.poster_path;
  image.setAttribute("height", "540");
  image.setAttribute("width", "370");
  image.src = poster;
  var tmdburl = "https://www.themoviedb.org/movie/" + movieDetails.id;

  document.getElementById("RandMovie").appendChild(image);
  document.getElementById('RandMovie').style.display = "block";
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<br>";
  document.getElementById('RandMovie').innerHTML +=movieDetails.original_title;
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<br>";
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML=movieDetails.tagline;
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<br>";
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML=movieDetails.release_date;
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<br>";
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML=movieDetails.runtime;
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<br>";
  document.getElementById('RandMovie').innerHTML += document.getElementById('RandMovie').innerHTML="<a href='" + tmdburl +"'>" + "TheMovieDB </a>";
}

function getRandomMovie() {
  var search = true;
  while(search){
  var movieID = Math.floor((Math.random() * latestID) + 2);
  //https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  //The API Key from the movie db is a public one. No need to steal it, just get your own, its easy.
  var reqURL = "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + "afe4e10abbb804e2b4a4f8a3ef067ad5" + "&language=en-US";
  var movieDetails = getMovieDetails(reqURL);
  // ¯\_(ツ)_/¯
  //Search might end in network error if there are no movies found matching this if monstrosity and therefore exceeding the api limit
  if(movieDetails.status_code != '34' && movieDetails.poster_path != null && movieDetails.original_title != null && movieDetails.tagline != null && movieDetails.tagline != "" && movieDetails.release_date != null && movieDetails.release_date != "" && movieDetails.runtime != null && movieDetails.runtime != 0){
    search = false;
    }
  }
  displayMovie(movieDetails);
  //document.getElementById('RandMovie').style.display = "block";
  //document.getElementById('RandMovie').innerHTML=movieDetails;
}
