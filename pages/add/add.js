const elForm = document.getElementById("form");

function add(newTOdo) {
  fetch("https://json-api.uz/api/project/muhammaddiyor-afandim/todos", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newTOdo),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      location.href = "/index.html";
    })
    .catch(() => {})
    .finally(() => {});
}
elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(elForm);
  const result = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  add(result);
});
