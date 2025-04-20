class FormValidator {
constructor(settings,formEl){
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
}

_showInputError(inputElement, errorMessage){
    const errorElementId = this._formEl.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
}
_hideInputError(inputElement){
    const errorElementId = this._formEl.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
}


_checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
        showInputError(
          inputElement,
          inputElement.validationMessage,
        );
      } else {
        hideInputError(inputElement);
      }
}

_hasInvalidInput(){
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
}

_toggleButtonState(){
    const buttonElement = this._formEl.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
}


_setEventListeners(){
     this._inputList = Array.from(
        this._formEl.querySelectorAll(this._inputSelector),
      );
      const buttonElement = this._formEl.querySelector(
        this._submitButtonSelector,
      );
    
      this._toggleButtonState(this._inputList, buttonElement, this._settings);
    
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(formEl, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
        });
      });
    };

enableValidation(){
    this._formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners();
    }
}

export default FormValidator
    