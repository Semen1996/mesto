
// Показываем ошибку
function showInputError(formElement, inputElement, errorClass, inputErrorClass, errorMesage) {

  //Находим элемент с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMesage;
  errorElement.classList.add(inputErrorClass);
}
  
  // Прячем ошибку
function hideInputError(formElement, inputElement, errorClass, inputErrorClass) {
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
  
  inputElement.classList.remove(errorClass);
  errorElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}
  
// Проверяем: есть ли ошибка?
function isValid(formElement, inputElement, errorClass, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorClass, inputErrorClass, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
}
  
// Проверяем: валидна ли форма?
function hasInvalidInput (inputList)  {
  
  return inputList.some((inputElement) => {
      
    return !inputElement.validity.valid;
  
  })
}


  // Придаем кнопке сохранить рабочее или не рабочее состояние (Если хотя бы один инпут не валиден, то кнопка не работает)
function toggleButtonState(inputList, buttonElement,inactiveButtonClass) {
   
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled',true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
  
}


  //Навешиваем форме слушателей форме
function setEventListeners(formElement,formObj) {
  
  const {inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        errorClass,
        inputErrorClass} = formObj;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);


  toggleButtonState(inputList, buttonElement,inactiveButtonClass);
  

  if (formElement.classList.contains('popup__container_edit')) {
    // Открытие попапа изменение профиля
    editButton.addEventListener('click', function() {
  
      toggleButtonState(inputList, buttonElement,inactiveButtonClass);
       // Проверка на валидность
       isValid(formElement, inputList[0], errorClass, inputErrorClass);
       isValid(formElement, inputList[1], errorClass, inputErrorClass);
    }); 
  }


  formElement.addEventListener('submit', function(evt) { 
    evt.preventDefault(); 
    
  // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement,inactiveButtonClass);
  });

  formElement.parentElement


  //Переберём полученную коллекцию
  inputList.forEach(function(inputElement) {
  




    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function() {
        
      // Проверка на валидность
      isValid(formElement, inputElement, errorClass, inputErrorClass);
  
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement,inactiveButtonClass);
  
    });

  });
  
}
  
  // Включаем валидацию форм
function enableValidation(formObj) {



  const {formSelector,inputSelector} = formObj;


  // Создаем массив, состоящий из форм
  const formList = Array.from(document.querySelectorAll(formSelector));
 


  //Переберём полученную коллекцию
  formList.forEach(function(formElement) {

    // Для каждой формы вызовем функцию setEventListener
    setEventListeners(formElement,formObj);
  
  });
    
}


// Подключаем валидацию форм
enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submitButton',
  inactiveButtonClass: 'popup__submitButton_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__field_error'
}); 