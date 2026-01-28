import { elContainer, elForm } from "./elemenets.js";
import { loader } from "./loader.js";
import { ui } from "./ui.js";
const Eledit = document.getElementById("edit");
let state = null;
let editedid = null;

function stateChanger(value) {
  state = value;
  ui(state);
}
loader(true);
fetch("https://json-api.uz/api/project/muhammaddiyor-afandim/todos")
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    stateChanger(res.data);
  })
  .catch(() => {})
  .finally(() => {
    loader(false);
  });
function edit(editedTOdo) {
  fetch(
    `https://json-api.uz/api/project/muhammaddiyor-afandim/todos/${editedTOdo.id}`,
    {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(editedTOdo),
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const result = state.map((el) => {
        if (el.id === res.id) {
          return res;
        } else {
          return el;
        }
      });
      stateChanger(result);
      Eledit.close();
    })
    .catch(() => {})
    .finally(() => {});
}
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(elForm);
  const result = { id: editedid };
  formData.forEach((value, key) => {
    result[key] = value;
  });
  console.log(result);

  edit(result);
});

elContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("js-edit")) {
    Eledit.showModal();
    const data = state.find((el) => el.id == evt.target.id);
    elForm.title.value = data.title;
    elForm.text.value = data.text;
    elForm.status.value = data.status;
    editedid = data.id;
  }
});
