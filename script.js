const BASE_URL = "http://localhost:3000/contacts";
const inputSearch = document.querySelector(".list");
const contactsDiv = document.querySelector(".contactsDiv");
const changeGender = document.querySelector(".select_gender");
const sortSelect = document.querySelector(".sort");
const openModal = document.querySelector(".button3");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal_form");

//Превью только что загруженной картинки
const preImage = document.querySelector("#profile_pic");
const img = document.querySelector("#img");
preImage.addEventListener("change", (event) => {
  const file = event.target.files[0];
  console.log(file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => console.log(e.target.result);
    img.src = URL.createObjectURL(file);
  }
});

modalForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const contactData = new FormData(modalForm);
  console.log(contactData);

  console.log(contactData);
  const post = await postData("http://localhost:3000/contacts", contactData);
  if (post) {
    const query =
      "?search=" +
      inputSearch.value +
      "&gender=" +
      changeGender.value +
      "&filter=" +
      sortSelect.value;
    const contactData = await fetchData(
      "http://localhost:3000/contacts" + query
    );
    render(contactData);
    modal.close();
  }
});
openModal.addEventListener("click", () => {
  modal.showModal();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

async function postData(url, data) {
  try {
    console.log(data);
    const response = await fetch(url, {
      method: "POST",

      body: data,
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data2 = await response.json();
    console.log(data2);
    return data2;
  } catch (error) {
    console.log("Error");
  }
}

async function fetchData(url, query = "") {
  try {
    const response = await fetch(url + query);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

async function handler() {
  const query =
    "?search=" +
    inputSearch.value +
    "&gender=" +
    changeGender.value +
    "&filter=" +
    sortSelect.value;
  const contactData = await fetchData("http://localhost:3000/contacts" + query);
  render(contactData);
}

inputSearch.addEventListener("input", handler);
changeGender.addEventListener("change", handler);
sortSelect.addEventListener("change", handler);

function render(contactData) {
  contactsDiv.innerHTML = "";
  contactData.forEach((data) => {
    const div = document.createElement("div");
    div.className = "contact_wrapper";
    console.log(data);
    const image = data.image
      ? `
    <img src="http://localhost:3000/${data.image}" width="70px" height="70px" />
    `
      : data.gender === "female"
      ? '<img src="./src/female_icon.png" alt="Female Icon" width="70px" height="70px" />'
      : '<img src="./src/male_icon.png" alt="Calendar Icon" width="70px" height="70px" />';
    div.innerHTML = `${image}
        <p class="contact_name">${data.name} ${data.surname}</p>
      <p class="contact_about">${data.about}</p>
      <p class="gender">${data.gender}</p>
      <p class="contact_number">${data.phone}</p>
      <p class="contact_email">${data.mail}</p>`;
    contactsDiv.append(div);
  });
}

handler();
