import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('textarea');

const STORAGE_KEY = 'feedback-form-state';

let formData = {};

formEl.addEventListener('input', throttle(onEmailMessageSave, 500));
formEl.addEventListener('submit', onSubmit);

populateInput();

//  Передача значения в ЛокалСт.
function onEmailMessageSave(evt) {
  evt.preventDefault();

  const emailInput = formEl.elements.email.value;
  const messageInput = textareaEl.value;

  formData = { email: emailInput, message: messageInput };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Заполнение сохр в локалст + заполнение полей.

function populateInput() {
  const saveInput = localStorage.getItem(STORAGE_KEY);

  if (saveInput) {
    const parsSaveInput = JSON.parse(saveInput);
    textareaEl.value = parsSaveInput.message || '';
    formEl.elements.email.value = parsSaveInput.email || '';
  }
}

// Ф-ция Сабмиту
function onSubmit(evt) {
  evt.preventDefault();

  const saveInput = localStorage.getItem(STORAGE_KEY);

  if (saveInput) {
    const parsSaveInput = JSON.parse(saveInput);
    console.log(parsSaveInput);
  }

  localStorage.removeItem(STORAGE_KEY);

  evt.currentTarget.reset();
}
// const LOCALSTORAGE_KEY = 'selectedFilters';
// const filterForm = document.querySelector('.filter-form');

// initForm();

// filterForm.addEventListener('submit', evt => {
//   evt.preventDefault();
//   const formData = new FormData(filterForm);
//   formData.forEach((value, name) => console.log(value, name));
// });

// filterForm.addEventListener('change', evt => {
//   let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
//   persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
//   persistedFilters[evt.target.name] = evt.target.value;
//   localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilters));
// });

// filterForm.addEventListener('reset', () => {
//   localStorage.removeItem(LOCALSTORAGE_KEY);
// });

// function initForm() {
//   let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
//   if (persistedFilters) {
//     persistedFilters = JSON.parse(persistedFilters);
//     Object.entries(persistedFilters).forEach(([name, value]) => {
//       filterForm.elements[name].value = value;
//     });
//   }
// }
