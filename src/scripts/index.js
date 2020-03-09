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
  constructor(containerSelector) {
    this.baseURL = "https://api.github.com/";
    this.submit = document.querySelector("button");
    this.loader = document.querySelector(".loader");

    this.container = document.querySelector(containerSelector);
    this.container.innerHTML = this.createForm();

    this.form = this.container.querySelector("form");
    this.form.addEventListener("submit", e => {
      e.preventDefault();
      this.fetchGitData(containerSelector);
    });

    this.inputUsername = this.form.querySelector("#username");

    this.loader.style.display = "none";
  }

  createForm() {
    return `
    <form>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Github username"
      />
      <button class="text-white bg-primary rounded-sm"">Submit</button>
    </form>
    `;
  }

  fetchGitData(containerSelector) {
    this.loader.style.display = "block";

    fetch(`${this.baseURL}users/${this.inputUsername.value}/repos`)
      .then(res => {
        if (!res.ok) {
          throw new Error();
        } else {
          return res.json();
        }
      })
      .then(data => {
        this.loader.style.display = "none";
        console.log(data);
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
        // const target = Object.values(this.targets);
        const targetHtlmElement = document.querySelector(containerSelector);
        console.log(targetHtlmElement);
        // if (containerSelector == "#widget1") {
        //   document.body.style.backgroundColor = "Beige";
        // } else if (containerSelector == "#widget2") {
        //   document.body.style.backgroundColor = "PowderBlue";
        // }

        targetHtlmElement.innerHTML = mappedData.join("\n");
      });
  }

  // addEvent() {
  //   this.submit.addEventListener("click", e => {
  //     e.preventDefault();

  //     this.inputUsername = document.querySelector("#username").value;

  //     this.fetchGitData();
  //   });
  // }
}

// Upon DOM content loaded creates a new instance of Class GithubWidget
document.addEventListener("DOMContentLoaded", e => {
  // 00 class instance
  new GithubWidget("#widget0");

  // 01 class instance
  new GithubWidget("#widget1");

  // 02 class instance
  new GithubWidget("#widget2");
});
