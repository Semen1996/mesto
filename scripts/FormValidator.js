export default class FormValidation {
  constructor(formObj,formElement) {
    this._formSelector = formObj.formSelector;
    this._inputSelector = formObj.inputSelector;
    this._submitButtonSelector = formObj.submitButtonSelector;
    this._inactiveButtonClass = formObj.inactiveButtonClass;
    this._errorClass = formObj.errorClass;
    this._inputErrorClass = formObj.inputErrorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._errorSpans = this._formElement.querySelectorAll(`.popup__input-error`);
  }

  // Показываем ошибку
  _showInputError(inputElement, errorMesage) {
  
    //Находим элемент с ошибкой
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(this._errorClass);
    errorElement.textContent = errorMesage;
    errorElement.classList.add(this._inputErrorClass);
  }

  // Прячем ошибку
  _hideInputError(inputElement) {
    
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    
    
    inputElement.classList.remove(this._errorClass);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  // Проверяем: есть ли ошибка?
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError( inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проверяем: валидна ли форма?
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

    // Придаем кнопке сохранить рабочее или не рабочее состояние (Если хотя бы один инпут не валиден, то кнопка не работает)
  _toggleButtonState() {

    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled',true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }  
  }

  //Навешиваем слушателей
  _setEventListeners(){

    this._toggleButtonState();
    
    //Переберём полученную коллекцию
    this._inputList.forEach( (inputElement) => {

      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        
        // Проверка на валидность
        this._isValid(inputElement);
  
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }


  // Включаем валидацию форм
  enableValidation() {
    // Для каждой формы вызовем функцию setEventListener
    this._setEventListeners();
  }

  resetForm() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');

    this._errorSpans.forEach( (errorSpan) => {
      errorSpan.textContent = '';
    });

    this._inputList.forEach((errorInput) => {
      errorInput.classList.remove(this._errorClass);
      errorInput.classList.remove(this._inputErrorClass);
    });
  }
    
}