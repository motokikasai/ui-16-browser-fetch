// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "regenerator-runtime/runtime";
import "bootstrap/scss/bootstrap.scss";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

// const baseURL = "https://api.github.com/";

// document.querySelector("main").innerHTML = "Loading...";

fetch(baseURL)
  .then(res => {
    return res.json();
  })
  .then(data => {});
