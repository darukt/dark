window.addEventListener('DOMContentLoaded', () => {
const buttonAddTaskList = document.getElementById('Add-Task-List');
const rightSide = document.getElementById('right-side');
const closePopup = document.getElementById('closePopup');
const inputTask = document.getElementById('inputTask').value.trim();
const addTask = document.getElementById('create-task-list');
const cancelTask = document.getElementById('cancel');

buttonAddTaskList.addEventListener('click', () => {
    rightSide.style.opacity = '1';
});
closePopup.addEventListener('click', () => {
    rightSide.style.opacity = '0';
});
cancelTask.addEventListener('click', () => {
    inputTask.value = '';
    rightSide.style.opacity = '0';
});
});