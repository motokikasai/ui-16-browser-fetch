// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "regenerator-runtime/runtime";
import "bootstrap/scss/bootstrap.scss";
import moment from "moment";
// Import any additional modules you want to include below \/

// \/ All of your javascript should go here \/

/** ----------------------------------------------------------
 * STD method
 * ---------------------------------------------------------- */

// const baseURL = "https://api.github.com/";

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
//             <span class="date">${moment(updatedAt).fromNow()}</span>
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

class GithubWidget {
  constructor(targets) {
    const baseURL = "https://api.github.com/";
    const submit = document.querySelector("button");
    const content = document.querySelector(".data-container");
    const loader = document.querySelector(".loader");
    // const target = `${Object.values(targets)[0]}`;

    this.baseURL = `${baseURL}`;
    this.submit = submit;
    this.content = content;
    this.loader = loader;

    // 'targets' must be an object, eg) { target: #target-container-id }
    this.targets = targets;

    this.loader.style.display = "none";
  }

  fetchGitData() {
    this.loader.style.display = "block";

    fetch(`${this.baseURL}users/${this.inputUsername}/repos`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then(data => {
        this.loader.style.display = "none";

        // Sort by Date Updated
        const sortedArrayOfObjects = data.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
        );
        console.log(sortedArrayOfObjects);

        // Map the data into the HTML template
        const mappedData = sortedArrayOfObjects.map(item => {
          this.name = item.name;
          this.description = item.description;
          this.createdAt = item.created_at;
          this.url = item.html_url;

          return `
          <a href=${this.url} target="_blank">
            <section class="content">
              <div class="header">
                <span class="title">${this.name}</span>
                <span class="date">${moment(this.createdAt).fromNow()}</span>
              </div>
              <div class="description">
              ${this.description}
              </div>
            </section>
          </a>
          `;
        });

        // Apply the given argument as the 'target elelment' in HTML
        const target = Object.values(this.targets);
        const targetHtlmElement = document.querySelector(target);
        console.log(targetHtlmElement);
        targetHtlmElement.innerHTML = mappedData.join("\n");

        // this.content.innerHTML = mappedData.join("\n");
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

document.addEventListener("DOMContentLoaded", e => {
  new GithubWidget({ target: "#widget2" }).addEvent();
});
