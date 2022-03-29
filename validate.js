let formSelector = '';
let inputSelector = '';
let submitButtonSelector  = '';
let inactiveButtonClass = '';
let inputErrorClass = '';
let errorClass = '';




// Показываем ошибку
function showInputError(formElement, inputElement,errorMesage) {

    //Находим элемент с ошибкой
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(errorClass);
    errorElement.textContent = errorMesage;
    errorElement.classList.add(inputErrorClass);
  }
  
  // Прячем ошибку
  function hideInputError(formElement, inputElement) {
  
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  
    inputElement.classList.remove(errorClass);
    errorElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
  }
  
  // Проверяем: есть ли ошибка?
  function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  // Проверяем: валидна ли форма?
  function hasInvalidInput (inputList)  {
  
    return inputList.some((inputElement) => {
      
      return !inputElement.validity.valid;
  
    })
  }

  // Придаем кнопке сохранить рабочее или не рабочее состояние (Если хотя бы один инпут не валиден, то кнопка не работает)
function toggleButtonState(inputList, buttonElement) {
   
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  
  }


  //Навешиваем форме слушателей форме
function setEventListeners(formElement) {
  
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);


 
  toggleButtonState(inputList, buttonElement);
  
  //Переберём полученную коллекцию
  inputList.forEach(function(inputElement) {
  
    isValid(formElement, inputElement);
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function() {
        
    // Проверка на валидность
    isValid(formElement, inputElement);
  
    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement);
  
    });
  });
  
}
  
  // Включаем валидацию форм
  function enableValidation(form) {

    formSelector = form.formSelector;
    inputSelector =  form.inputSelector;
    submitButtonSelector =  form.submitButtonSelector;
    inactiveButtonClass =  form.inactiveButtonClass;
    inputErrorClass =  form.inputErrorClass;
    errorClass =  form.errorClass;

  
    // Создаем массив, состоящий из форм
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    //Переберём полученную коллекцию
    formList.forEach(function(formElement) {
  
      // Для каждой формы вызовем функцию setEventListener
      setEventListeners(formElement);
  
    });
    
  }