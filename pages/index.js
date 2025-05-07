import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {initialTodos, validationConfig, addTodoButton, addTodoForm,} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const handleComplete = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted);
 };

 const handleDelete = (wasCompleted) => {
    todoCounter.updateTotal(false);
    if (wasCompleted) {
     todoCounter.updateCompleted(false);
    }
    };

const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", handleComplete, handleDelete);
    const todoElement = todo.getView();
    return todoElement;
};


const section = new Section({
    items: initialTodos,
    renderer: generateTodo,
    containerSelector: ".todos__list"
});

const todoForm = new PopupWithForm({ popupElement: '.popup' }, (formData) => {
    const todoData = {
        ...formData,
        id: uuidv4()
    };
    const todo = generateTodo(todoData);
    section.addItem(todo);
    todoCounter.updateTotal(true)
    todoForm.close();
    newTodoValidator.resetValidation();
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");
todoForm.setEventListeners();  
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();




addTodoButton.addEventListener('click', () => {
    todoForm.open();
});

section.renderItems();