'use strict'

const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');
const errorDisplay = document.querySelector('#comment-error-display');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameValue = nameField.value.trim();
    const commentValue = commentField.value.trim();
    const nameParam = document.createElement('p');
    const commentParam = document.createElement('p');

    if(!nameValue || nameValue === '' || !commentValue || commentValue === ''){
        errorDisplay.textContent = "Please fill out both fields"
        return;
    }

    nameParam.textContent = nameValue;
    commentParam.textContent = commentValue;

    const listItem = document.createElement('li');
    list.appendChild(listItem);
    listItem.appendChild(nameParam);
    listItem.appendChild(commentParam);


    errorDisplay.textContent = ''
    nameField.value = '';
    commentField.value = '';
});