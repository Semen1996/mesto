const popupEditSelector = '.popup_edit';
const popupNameSelector = '.profile__name';
const popupJobSelector = '.profile__description';
const popupAddSelector = '.popup_add';
const userElements = '.elements';
const popupImageSelector = '.popup_image';
const templateSelector = '#element';

// Находим кнопку для открытия попапа редактирования профиля
const editButton = document.querySelector('.profile__editButton');
// Находим кнопку для открытия попапа добавления карточки
const addButton = document.querySelector('.profile__addButton');
const formElementEdit = document.querySelector('.popup__container_edit');
const nameInput = formElementEdit.querySelector('.popup__field_type_name');
const jobInput = formElementEdit.querySelector('.popup__field_type_description');
const formElementAdd = document.querySelector('.popup__container_add');


// Массив классов и селекторов
const formObj = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submitButton',
  inactiveButtonClass: 'popup__submitButton_inactive',
  inputErrorClass: 'popup__input-error_active',
  errorClass: 'popup__field_error'
};



export {popupEditSelector, popupNameSelector, popupJobSelector, popupAddSelector, userElements, popupImageSelector, templateSelector,
        editButton, addButton, formElementEdit, nameInput, jobInput, formElementAdd, formObj};