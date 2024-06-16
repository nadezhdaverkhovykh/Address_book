import { contacts } from "./data.js";
// console.log(contacts);
// const searchBar = document.querySelector(".contact_form");
// searchBar.addEventListener("submit", function (event) {
//   event.preventDefault();
// });
// document.querySelector(".button4").addEventListener("submit", function () {
//   findContact();
// });
// function findContact() {
//   const searchBar = document.querySelector(".contact_form").value.toLowerCase();
//   searchBar.preventDefault();
//
//   contacts.forEach((el) => {
//     if (
//       el.name.toLowerCase().includes(searchBar) ||
//       el.surname.toLowerCase().includes(searchBar)
//     ) {
//       const div = document.createElement("div");
//       div.className = "contact_wrapper";

//
//
//     }
//   });
// }

const contactsDiv = document.querySelector(".contactsDiv");

function render(arr) {
  contactsDiv.innerHTML = "";
  arr.forEach((el) => {
    const div = document.createElement("div");
    div.className = "contact_wrapper";
    div.innerHTML = `
      <img src="./src/female_icon.png" alt="" />
      <p class="contact_name">${el.name} ${el.surname}</p>
      <p class="contact_about">${el.about}</p>
      <p class="gender">${el.gender}</p>
      <p class="contact_number">${el.phone}</p>
      <p class="contact_email">${el.mail}</p>
    `;
    contactsDiv.append(div);
  });
}

render(contacts);

document.querySelector(".button2").addEventListener("click", function () {
  sort(contacts);
  render(contacts);
});

function sort(arr) {
  arr.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

const selectElement = document.querySelector(".female");
const selectElement2 = document.querySelector(".male");
document.querySelector(".button1").addEventListener("click", function () {
  sortByGender(contacts);
  render(contacts);
});

function sortByGender(arr) {
  arr.sort((a, b) => {
    return a.gender.localeCompare(b.gender);
  });
}

// document.querySelector(".male").addEventListener("click", function () {
//   sortByGender2(contacts);
//   render(contacts);
// });

// function sortByGender2(arr) {
//   arr.sort((a, b) => {
//     return b.gender.localeCompare(a.gender);
//   });
// }
