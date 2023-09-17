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
    this.#switch.addEventListener("change", this.#changeTheme);
    this.#fontSelect.addEventListener("change", this.#changeFont);
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#input.addEventListener("input", this.#onInput.bind(this));
    this.#keyboardContainer.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this),
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #changeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : "",
    );
  }

  #changeFont(event) {
    document.documentElement.style.fontFamily = event.target.value;
  }

  #onKeyDown(event) {
    if (this.#mouseDown) return;
    this.#keyDown = true;

    this.#inputContainer.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(event.key),
    );
    this.#keyboardContainer
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    if (this.#mouseDown) return;
    this.#keyDown = false;

    this.#keyboardContainer
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onInput() {
    this.#input.value = this.#input.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }

  #onMouseDown(event) {
    if (this.#keyDown) return;
    this.#mouseDown = true;

    event.target.closest(".key")?.classList.add("active");
  }

  #onMouseUp(event) {
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
  }
}
