export default class Popup{
    constructor({popupElement}){
        this._popupElement = document.querySelector(popupElement);
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }
    open() {
        this._popupElement.classList.add("popup_visible");
        document.addEventListener("keydown", this._handleEscapeClose);
    }
    
    close() {
        this._popupElement.classList.remove("popup_visible");
        document.removeEventListener("keydown", this._handleEscapeClose);
    }
    
    _handleEscapeClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    setEventListeners(){
        this._popupElement.addEventListener("click", (evt) =>{
            if(evt.target.classList.contains('popup__close') || 
        evt.target === this._popupElement) {
            this.close();
        }
        })
    }
}