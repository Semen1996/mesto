import './pages/index.css';

import {popupEditSelector, popupNameSelector, popupJobSelector, popupAddSelector, userElements, popupImageSelector, templateSelector,
    editButton, addButton, formElementEdit, nameInput, jobInput, formElementAdd, formObj} from './utils/constants.js';
import initialCards from './utils/initial-cards.js';
import Card from './components/Card.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidation from './components/FormValidator.js';





// Создаем экземпляр класса, отвечающий за отрисовку элементов на странице
const section = new Section({
  items: initialCards,
  renderer: (item)=> {
    const cardElement = createCard(item.link,item.name);
    section.addItem(cardElement);
  }
},
userElements);

// Отрисовываем карточки на странице
section.renderItems();



// Создаем экземпляр класса, открывающий попап с картинкой
const popupImage = new PopupWithImage(popupImageSelector);

//Устанавливаем слушателей для попапа с картинкой
popupImage.setEventListeners();



// Создаем экземпляр класса управления отображения информации о себе
const userInfo = new UserInfo(popupNameSelector, popupJobSelector);



// Создаем экземпляр класса для попапа редактирования профиля
const popupEdit = new PopupWithForm({popupSelector: popupEditSelector,
  handleFormSubmit: (dataForm) => {
    userInfo.setUserInfo(dataForm);
    popupEdit.close();
  }
});

// Устанавливаем слушателей для попапа редактирования профиля
popupEdit.setEventListeners();



// Создаем экземпляр класса для попапа создания карточки
const popupAdd = new PopupWithForm({popupSelector: popupAddSelector,
  handleFormSubmit: (dataForm) => {
    section.addItem(createCard(dataForm.link,dataForm.title));
    popupAdd.close();
    validationPopupAdd.resetForm();
  }
});

function handleCardClick(title, link) {
  popupImage.open(title, link);
}
  
// Создаем новую карточку
function createCard(link,title) {
  const card = new Card(link, title, templateSelector, handleCardClick);
  return card.generateCard();
}

// Устанавливаем слушателей для попапа добавления карточки
popupAdd.setEventListeners();



// Создаем экземпляры классов валидации форм
const validationPopupAdd = new FormValidation(formObj, formElementAdd);
const validationPopupEdit = new FormValidation(formObj, formElementEdit);

// Подключаем валидацию форм
validationPopupAdd.enableValidation();
validationPopupEdit.enableValidation();



// Открытие попапа изменение профиля
editButton.addEventListener('click', function() {
  popupEdit.open();

  const user = userInfo.getUserInfo();

  nameInput.value = user.name;
  jobInput.value = user.job;

  
  validationPopupEdit.resetForm();
});

//  Открытие попапа добавления элемента
addButton.addEventListener('click', function(){
  popupAdd.open();
});