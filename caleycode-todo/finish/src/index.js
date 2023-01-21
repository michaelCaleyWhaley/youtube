import "./style-globals.scss";
import "./style.scss";

const [todoFormEle] = document.getElementsByClassName("todo-form");
const [submitFormEle] = document.getElementsByClassName("todo-form__submit");
const [todoFormInputEle] = document.getElementsByClassName("todo-form__input");
const [todoListEle] = document.getElementsByClassName("todo__list");

const todoRemoveEleList = document.getElementsByClassName("todo__remove-btn");
const checkBtnEleList = document.getElementsByClassName("todo__check-btn");

function generateNewTodo(value) {
  const liEle = document.createElement("li");
  liEle.setAttribute("class", "todo__item");
  liEle.innerHTML = `
    <button class="todo__check-btn todo__check-btn--inactive">
      <i class="todo__check fa-solid fa-check"></i>
    </button>
    ${value}
    <button class="todo__remove-btn todo__remove-btn--inactive">
      <i class="todo__cross fa-solid fa-plus"></i>
    </button>
  `;
  return liEle;
}

function handleCheckClick(e) {
  let currentTarget = e.target;
  while (currentTarget.nodeName.toLowerCase() !== "li") {
    currentTarget = currentTarget.parentElement;
  }
  if (currentTarget.classList.contains("todo__item--checked")) {
    currentTarget.classList.remove("todo__item--checked");
    return;
  }
  currentTarget.classList.add("todo__item--checked");
}

function handleCrossClick(e) {
  let currentTarget = e.target;
  while (currentTarget.nodeName.toLowerCase() !== "li") {
    currentTarget = currentTarget.parentElement;
  }
  currentTarget.remove();
}

function activateBtns(targetClass, callback) {
  const inactiveBtns = document.getElementsByClassName(targetClass);
  for (let i = 0; i < inactiveBtns.length; i += 1) {
    inactiveBtns[i].addEventListener("click", callback);
    inactiveBtns[i].classList.remove(targetClass);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const newTodoValue = todoFormInputEle.value;
  if (newTodoValue.length <= 0) return;
  const newTodoHtml = generateNewTodo(newTodoValue);
  todoListEle.appendChild(newTodoHtml);
  todoFormInputEle.value = "";

  activateBtns("todo__check-btn--inactive", handleCheckClick);
  activateBtns("todo__remove-btn--inactive", handleCrossClick);
}

function init() {
  submitFormEle.addEventListener("click", handleFormSubmit);
  todoFormEle.addEventListener("submit", handleFormSubmit);
  todoRemoveEleList[0].addEventListener("click", handleCrossClick);
  checkBtnEleList[0].addEventListener("click", handleCheckClick);
}

init();
