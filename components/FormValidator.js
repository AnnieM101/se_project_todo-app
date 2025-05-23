class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

 resetValidation(){
    this._formEl.reset();
    this._toggleButtonState();
  }
  
  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

 

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
