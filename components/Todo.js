class Todo {
    constructor(data, selector, handleComplete, handleDelete) {
        this._data = data;
        this._templateElement = document.querySelector(selector);
        this._handleComplete = handleComplete; 
        this._handleDelete = handleDelete;
    } 

    _generateCheckboxEl(){
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");  
        this._todoCheckboxEl.checked = this._data.completed;  
        this._todoCheckboxEl.id = `todo-${this._data.id}`;  
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    }

    _setEventListeners() {
        this._todoCheckboxEl.addEventListener("change", () => {
          this._data.completed = !this._data.completed;
      
          if (this._handleComplete) {
            this._handleComplete(this._data.completed);
          }
        });
      
        this._todoDeleteBtn.addEventListener("click", () => {
          if (this._handleDelete) {
            this._handleDelete(this._data.completed);
          }
      
          this._todoElement.remove();
          this._todoElement = null;
        });
      }

    _setTodoDate() {
        if(this._data.date) {
            const date = new Date(this._data.date);
            this._todoDate.textContent = `Due: ${date.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
         }
         else{
            this._todoDate.textContent="";
         }
        }
    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);
        const todoNameEl = this._todoElement.querySelector(".todo__name");
        this._todoDate = this._todoElement.querySelector(".todo__date");
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
        todoNameEl.textContent = this._data.name;
        this._setTodoDate();
        this._generateCheckboxEl();
        this._setEventListeners();
        return this._todoElement;
    }
  } 
export default Todo;

