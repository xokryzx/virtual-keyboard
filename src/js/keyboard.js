export class Keyboard {
  #switch;
  #fontSelect;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switch = document.querySelector(".switch__input");
    this.#fontSelect = document.querySelector("#font");
  }

  #addEvent() {
    this.#switch.addEventListener("change", (event) => {
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : "",
      );
    });
    this.#fontSelect.addEventListener("change", (event) => {
      document.documentElement.style.fontFamily = event.target.value;
    });
  }
}
