export class Keyboard {
  #switch;
  #fontSelect;
  #inputContainer;
  #input;
  #keyboardContainer;
  #keyDown = false;
  #mouseDown = false;
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
      if (this.#mouseDown) return;
      this.#keyDown = true;
      this.#inputContainer.classList.toggle(
        "error",
        /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key),
      );
      this.#keyboardContainer
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (event) => {
      if (this.#mouseDown) return;
      this.#keyDown = false;
      this.#keyboardContainer
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    });
    this.#input.addEventListener("input", () => {
      this.#input.value = this.#input.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
    });
    this.#keyboardContainer.addEventListener("mousedown", (event) => {
      if (this.#keyDown) return;
      this.#mouseDown = true;
      event.target.closest(".key")?.classList.add("active");
    });
    document.addEventListener("mouseup", (event) => {
      if (this.#keyDown) return;
      this.#mouseDown = false;
      const $key = event.target.closest(".key");
      const isActive = $key?.classList.contains("active");
      const $dataValue = $key?.dataset.value;
      if (isActive && $dataValue) {
        if ($dataValue === "Space") {
          this.#input.value += " ";
        } else if ($dataValue === "Backspace") {
          this.#input.value = this.#input.value.slice(0, -1);
        } else {
          this.#input.value += $dataValue;
        }
      }
      this.#keyboardContainer
        .querySelector(".active")
        ?.classList.remove("active");
    });
  }
}
