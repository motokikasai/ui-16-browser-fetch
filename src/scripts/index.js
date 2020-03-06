// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "regenerator-runtime/runtime";
import "bootstrap/scss/bootstrap.scss";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

/** ----------------------------------------------------------
 * STD method
 * ---------------------------------------------------------- */

// const baseURL = "https://api.github.com/";

// // document.querySelector("main").innerHTML = "Loading...";

// const submit = document.querySelector("button");
// submit.addEventListener("click", e => {
//   e.preventDefault();

//   const inputUsername = document.querySelector("#username").value;
//   const content = document.querySelector(".data-container");

//   // console.log(inputUsername);

//   fetch(`${baseURL}users/${inputUsername}/repos`)
//     .then(res => {
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);

//       const mappedData = data.map(item => {
//         const name = item.name;
//         const description = item.description;
//         const updatedAt = item.updated_at;

//         console.log(`
//         ${name},
//         ${description},
//         ${updatedAt}`);

//         return `
//         <section class="content">
//           <div class="header">
//             <span class="title">${name}</span>
//             <span class="date">${updatedAt}</span>
//           </div>
//           <div class="description">
//           ${description}
//           </div>
//         </section>
//         `;
//       });

//       content.innerHTML = mappedData.join("\n");
//     });
// });

/** ----------------------------------------------------------
 * Class method
 * ---------------------------------------------------------- */

class GitAPI {
  constructor() {
    const baseURL = "https://api.github.com/";
    const submit = document.querySelector("button");
    const content = document.querySelector(".data-container");

    this.baseURL = `${baseURL}`;
    this.submit = submit;
    this.content = content;
  }

  fetchGitData() {
    fetch(`${this.baseURL}users/${this.inputUsername}/repos`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then(data => {
        const mappedData = data.map(item => {
          this.name = item.name;
          this.description = item.description;
          this.updatedAt = item.updated_at;

          // console.log(`
          // ${this.name},
          // ${this.description},
          // ${this.updatedAt}`);

          return `
          <section class="content">
            <div class="header">
              <span class="title">${this.name}</span>
              <span class="date">${this.updatedAt}</span>
            </div>
            <div class="description">
            ${this.description}
            </div>
          </section>
          `;
        });

        this.content.innerHTML = mappedData.join("\n");
      });
  }

  addEvent() {
    this.submit.addEventListener("click", e => {
      e.preventDefault();

      const inputUsername = document.querySelector("#username").value;
      this.inputUsername = inputUsername;

      this.fetchGitData();
    });
  }
}

const getReposByUsername = new GitAPI();
getReposByUsername.addEvent();

// console.log(getReposByUsername.addEvent());
