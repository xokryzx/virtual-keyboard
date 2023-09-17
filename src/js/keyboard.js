export class Keyboard {
  #switch;
  #fontSelect;
  #inputContainer;
  #input;
  #keyboardContainer;
  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#switch = document.querySelector(".switch__input");
    this.#fontSelect = document.querySelector("#font");
    this.#inputContainer = document.querySelector(".input-container");
    this.#input = document.querySelector(".input");
    this.#keyboardContainer = document.querySelector(".keyboard-container");
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
    document.addEventListener("keydown", (event) => {
      this.#inputContainer.classList.toggle(
        "error",
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key),
      );
      this.#keyboardContainer
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (event) => {
      this.#keyboardContainer
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    });
    this.#input.addEventListener("input", () => {
      this.#input.value = this.#input.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    });
  }
}
