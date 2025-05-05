export default class TodoCounter{
    constructor(todos, todoSelector) {
        this._element = document.querySelector(todoSelector);
        this._total = todos.length;
        this._completed = todos.filter(todo => todo.completed).length;
        this._updateText();
    }

    updateCompleted(increment) {
        this._completed = this._completed + (increment ? 1 : -1);
        this._updateText();
    }

    updateTotal(increment){
        this._total = this._total + (increment ? 1 : -1);
        this._updateText();
    }
    _updateText(){
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
}