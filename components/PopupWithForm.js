import Popup from "../components/Popup.js"; 
export default class PopupWithForm extends Popup{
    constructor({popupElement}, handleSubmit){
        super({popupElement});
        this._handleSubmit = handleSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
    }
    _getInputValues(){
        const inputs = [...this._form.querySelectorAll('.popup__input')]
        const values = {};

        inputs.forEach(input => {
            values[input.name] = input.value;
        });

        return values;
    };
    setEventListeners(){
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }
    
}