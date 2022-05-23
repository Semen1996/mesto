const popupEditSelector = '.popup_edit';
const popupNameSelector = '.profile__name';
const profileAvatarSelector = '.profile__avatar';
const popupJobSelector = '.profile__description';
const popupAddSelector = '.popup_add';
const userElements = '.elements';
const popupImageSelector = '.popup_image';
const templateSelector = '#element';


const editButton = document.querySelector('.profile__editButton');
const addButton = document.querySelector('.profile__addButton');
const formElementEdit = document.querySelector('.popup__container_edit');
const nameInput = formElementEdit.querySelector('.popup__field_type_name');
const jobInput = formElementEdit.querySelector('.popup__field_type_description');
const formElementAdd = document.querySelector('.popup__container_add');

const updateAvatarButton = document.querySelector('.profile__avatar');
const popupUpdateAvatarSelector = '.popup_updateAvatar';
const popupConfirmationSelector = '.popup_delete';


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
        editButton, addButton, formElementEdit, nameInput, jobInput, formElementAdd, formObj, profileAvatarSelector, updateAvatarButton, popupUpdateAvatarSelector,
        popupConfirmationSelector};