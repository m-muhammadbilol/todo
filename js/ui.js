import { elContainer, elCardTemplate } from "./elemenets.js";

export function ui(todos) {
  elContainer.innerHTML = null;
  todos.forEach((element) => {
    const clone = elCardTemplate.cloneNode(true).content;
    clone.querySelector(".js-title").innerText = element.title
      ? element.title
      : "No Title";
    clone.querySelector(".js-text").innerText = element.text
      ? element.text
      : "No Text";

    clone.querySelector(".js-status").innerText = element.status
      ? element.status
      : "No Status";
    clone.querySelector(".js-edit").id = element.id;

    elContainer.appendChild(clone);
  });
}
