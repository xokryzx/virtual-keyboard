export class Keyboard {
  #switch;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switch = document.querySelector(".switch__input");
  }

  #addEvent() {
    this.#switch.addEventListener("change", (event) => {
      document.documentElement.setAttribute(
        "theme",
        event.target.checked ? "dark-mode" : "",
      );
    });
  }
}
