import Card from './Card.js';
import FormValidation from './FormValidator.js';

const popupEdit = document.querySelector('.popup_edit');
const editButton = document.querySelector('.profile__editButton');
const formElementEdit = document.querySelector('.popup__container_edit');
const nameInput = formElementEdit.querySelector('.popup__field_type_name');
const jobInput = formElementEdit.querySelector('.popup__field_type_description');
const submitButtonEdit = formElementEdit.querySelector('.popup__submitButton');
const inputsPopupEdit = formElementEdit.querySelectorAll('.popup__input');
const popupName = document.querySelector('.profile__name');
const popupJob = document.querySelector('.profile__description');

const popupAdd = document.querySelector('.popup_add');
const addButton = document.querySelector('.profile__addButton');
const submitButtonAdd = popupAdd.querySelector('.popup__submitButton');

const userElements = document.querySelector('.elements');
const formElementAdd = document.querySelector('.popup__container_add');
const titleInput = formElementAdd.querySelector('.popup__field_type_title');
const linkInput = formElementAdd.querySelector('.popup__field_type_link');
const closeImage = document.querySelector('.popup__close_image');

const popupImage = document.querySelector('.popup_image');
const popupPicture = document.querySelector('.popup__picture');
const popupFigcaption = document.querySelector('.popup__figcaption');

const templateSelector = '#element';

// Массив классов и селекторов
const formObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submitButton',
  inactiveButtonClass: 'popup__submitButton_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__field_error'
};



// Подключаем валидацию форм
const validationPopupAdd = new FormValidation(formObj, formElementAdd);
const validationPopupEdit = new FormValidation(formObj, formElementEdit);

validationPopupAdd.enableValidation();
validationPopupEdit.enableValidation();


// Создаем новую карточку
function createCard(link,title) {
  const card = new Card(link, title, templateSelector, handleCardClick);
  return card.generateCard();
}

// Вставляем новую карточку 
function insertCard(link,title) {
  const cardElement = createCard(link,title);
  userElements.prepend(cardElement); 
}


// добавляем начальные карточки
initialCards.forEach( (item) => {
  insertCard(item.link,item.name);
});









// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown',closeButtonOverlay);
  document.addEventListener('keydown',closeButtonEsc);
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('mousedown',closeButtonOverlay);
  document.removeEventListener('keydown',closeButtonEsc);
}

// Закрытие попапа с помощью кнопки Esc
function closeButtonEsc(evt) {
  if (evt.key==='Escape') {
  closePopup( document.querySelector('.popup_opened') );
 }
}

// Закрытие попапа с помощью нажатие на оверлей
function closeButtonOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function handleCardClick(title, link) {
  popupPicture.src = link;
  popupPicture.alt = title;
  popupFigcaption.textContent = title;
  openPopup(popupImage);
}



// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = popupName.textContent;
  jobInput.value = popupJob.textContent;

  
  validationPopupEdit.resetForm();
}); 


//  Открытие попапа добавления элемента
addButton.addEventListener('click', function(){
  openPopup(popupAdd);
}); 



const popups = document.querySelectorAll('.popup');



function submitPopupEdit(evt) {
  evt.preventDefault();      

  closePopup(popupEdit);
  popupName.textContent = nameInput.value;
  popupJob.textContent = jobInput.value;
}


function submitPopupAdd(evt) {
  evt.preventDefault(); 

  closePopup(popupAdd);
  insertCard(linkInput.value,titleInput.value);

  linkInput.value='';
  titleInput.value='';

 validationPopupAdd.enableValidation();
}

// Редактирование попапа изменение профиля
formElementEdit.addEventListener('submit', submitPopupEdit);

// Прикрепляем обработчик к форме
formElementAdd.addEventListener('submit', submitPopupAdd);



// Навешиваем попапам слушателей
popups.forEach(function(popup) {

  const closeButton = popup.querySelector('.popup__close');

  // Закрытие попапа крестиком
  closeButton.addEventListener('click', function() {
    closePopup(popup);
  });

});
