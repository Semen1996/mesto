const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_description');
const popupName = document.querySelector('.profile__name');
const popupJob = document.querySelector('.profile__description');
const userElements = document.querySelector('.elements');
const formElementAdd = document.querySelector('.popup__container_add');
const titleInput = formElementAdd.querySelector('.popup__field_type_title');
const linkInput = formElementAdd.querySelector('.popup__field_type_link');
const popupImage = document.querySelector('.popup_image');
const popupPicture = document.querySelector('.popup__picture');
const elementTemplate = document.querySelector('#element').content;
const MAIN = document.querySelector('.root');
const closeImage = document.querySelector('.popup__close_image');

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}


// Вставляем новую карточку 
function insertCard(link,title) {

  const card = addCard(link,title);

  // отображаем на странице
  userElements.prepend(card); 
}


// Функция для добавления карточки 
function addCard(link,title) {

  const userElement = elementTemplate.querySelector('.element').cloneNode(true);
  const elementPicture = userElement.querySelector('.element__picture');

  // наполняем содержимым
  elementPicture.src = link;
  elementPicture.alt = title;
  userElement.querySelector('.element__title').textContent = title;

  // Ставим лукасы
  userElement.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active');
  }); 

  // удаляем элемент
  userElement.querySelector('.element__dump').addEventListener('click', function(evt){
    evt.target.closest('.element').remove();
  });

  // Открываем попап с картинкой
  elementPicture.addEventListener('click', function(evt){
    openPopup(popupImage);
    popupPicture.src = link;
    popupPicture.alt = title;
    document.querySelector('.popup__figcaption').textContent = title;
  });

  return userElement;
}

// При нажатии на submit
function submitPopup(evt) {
  closePopup(evt.target.parentElement);
  
  if (evt.target.classList.contains('popup__container_edit')) {

  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;      

  } else if(evt.target.classList.contains('popup__container_add')) {

    insertCard(linkInput.value,titleInput.value);
    linkInput.value='';
    titleInput.value='';

  }
}

// Закрытие Попапа всеми возможными методами
function closeButtonsPopup(closeButton,popup) {

  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

  MAIN.addEventListener('keydown',function(evt) {
    if (evt.key==='Escape') {
      closePopup(popup);
   }
  });

  popup.addEventListener('click',function(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
    
  });

}


// Показываем ошибку
function showInputError(formElement, inputElement,errorMesage) {

  //Находим элемент с ошибкой
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__field_error');
  errorElement.textContent = errorMesage;
  errorElement.classList.add('popup__input-error_active');
}

// Прячем ошибку
function hideInputError(formElement, inputElement) {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);


  inputElement.classList.remove('popup__field_error');
  errorElement.classList.remove('popup__input-error_active');
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
function toggleButtonState(formElement,inputList, buttonElement) {
  
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submitButton_inactive');
    formElement.removeEventListener('submit', submitPopup);
  } else {
    buttonElement.classList.remove('popup__submitButton_inactive');
    formElement.addEventListener('submit', submitPopup);
  }

}

//Навешиваем форме слушателей форме
function setEventListeners(formElement) {
  
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__submitButton');
  const closeButton = formElement.querySelector('.popup__close');
  const popup = formElement.parentElement;
  const openPopupButton = document.querySelector(`.profile__${popup.id}`);
  
  // У каждой формы отменим стандартное поведение
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // Открытие попапа
  openPopupButton.addEventListener('click', function() {
    
    openPopup(popup);
    
    if (popup.classList.contains('popup_edit')) {
    nameInput.value = popupName.textContent;
    jobInput.value = popupJob.textContent;
    }

    toggleButtonState(formElement,inputList, buttonElement);

      //Переберём полученную коллекцию
    inputList.forEach(function(inputElement) {

      isValid(formElement, inputElement);
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', function() {
      
      // Проверка на валидность
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(formElement,inputList, buttonElement);

    });
  });

    closeButtonsPopup(closeButton,popup);

  }); 

}

// Включаем валидацию форм
function enableValidation() {

  // Создаем массив, состоящий из форм
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  
  //Переберём полученную коллекцию
  formList.forEach(function(formElement) {

    // Для каждой формы вызовем функцию setEventListener
    setEventListeners(formElement);

  });
}


// добавляем начальные карточки
for (let i = 0; i < initialCards.length; i++) {
  insertCard(initialCards[i].link,initialCards[i].name);
};

// Подключаем валидацию форм
enableValidation();

// Закрываем попап с изображением
closeButtonsPopup(closeImage,popupImage);