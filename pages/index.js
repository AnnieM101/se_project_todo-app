import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {initialTodos, validationConfig, addTodoButton, addTodoPopup, addTodoForm, addTodoCloseBtn, todoTemplate, todosList} from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const handleComplete = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted);
 };
const generateTodo = (data) => {
    const todo = new Todo(data, "#todo-template", handleComplete);
    const todoElement = todo.getView();
    return todoElement;
};


const section = new Section({
    items: initialTodos,
    renderer: generateTodo,
    containerSelector: ".todos__list"
});

const todoForm = new PopupWithForm({ popupSelector: '.popup' }, (formData) => {
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
  


const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();


todoForm.setEventListeners();

addTodoButton.addEventListener('click', () => {
    newTodoValidator.resetValidation();
    todoForm.open();
});

section.renderItems();