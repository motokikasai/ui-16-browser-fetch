// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "regenerator-runtime/runtime";
import "bootstrap/scss/bootstrap.scss";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

const baseURL = "https://api.github.com/";

// document.querySelector("main").innerHTML = "Loading...";

// class GitRepo {
//   constructor(username) {
//     this.username = username;
//   }
// }

const submit = document.querySelector("button");
submit.addEventListener("click", e => {
  e.preventDefault();

  const inputUsername = document.querySelector("#username").value;
  // console.log(inputUsername);

  fetch(`${baseURL}users/${inputUsername}/repos`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data);

      const mappedData = data.map(item => {
        const name = item.name;
        const description = item.description;
        const created = item.updated_at;

        console.log(`
        ${name}, 
        ${description}, 
        ${created}`);

        let newHTML = `
        
        <div class="header">
          <span class="title">Title</span>
          <span class="date">date</span>
        </div>
        <div class="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
          doloremque asperiores consequuntur atque quidem quibusdam eveniet
          saepe ipsam facilis doloribus.
        </div>
        
        
        `;
      });
    });
});
